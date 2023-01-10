import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { convertToRaw, EditorState } from "draft-js";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { trpc } from "../utils/trpc";
import { useState } from "react";

const Home: NextPage = () => {
  const utils = trpc.useContext();

  const { mutate } = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.invalidate();
    },
  });
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    keywords: "",
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(state: any) {
    console.log({ state });
    setEditorState(state);
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title: inputValues.title,
      content: inputValues.content,
      keywords: inputValues.keywords,
    });
  };
  console.log({ editorState: convertToRaw(editorState.getCurrentContent()) });

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <AuthShowcase />
        <p className="">test</p>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorClassName="bg-white h-96 "
          // i want to change the options of the toolbar
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // lets add different headings
          }}
        />

        {/* <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            handleSubmitForm(e);
          }}
        >
          <input
            placeholder="input your title here"
            value={inputValues.title}
            onChange={(e) => {
              setInputValues({ ...inputValues, title: e.target.value });
            }}
          />
          <input
            placeholder="input your content here"
            value={inputValues.content}
            onChange={(e) => {
              setInputValues({ ...inputValues, content: e.target.value });
            }}
          />
          <input
            placeholder="input your keyword here"
            value={inputValues.keywords}
            onChange={(e) => {
              setInputValues({ ...inputValues, keywords: e.target.value });
            }}
          />
          <button type="submit">Submit</button>
        </form> */}
        {/* <Posts /> */}
      </main>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  // const { data: comments } = trpc.comment.getAll.useQuery();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  console.log({ sessionData });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>

      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const Posts = () => {
  const { data } = trpc.post.getAll.useQuery();

  return (
    <>
      <h1 className="text-xl font-bold text-white">ALL post will go here</h1>

      {data &&
        data.map((d) => {
          return (
            <div key={d.title}>
              <Link href={`/posts/${d.id}`}>
                <p className="text-xl text-white">{d.title}</p>
              </Link>
            </div>
          );
        })}
    </>
  );
};
