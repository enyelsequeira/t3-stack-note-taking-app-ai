import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { trpc } from "../utils/trpc";
import { useCallback, useState } from "react";
import Layout from "../layout";
import Hero from "../components/hero";

const Home: NextPage = () => {
  const [doc, setDoc] = useState<string>("# Hello, world");
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

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

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title: inputValues.title,
      content: inputValues.content,
      keywords: inputValues.keywords,
    });
  };

  return (
    <Layout>
      <Hero />
    </Layout>
    // <div>
    //   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    //     <AuthShowcase />
    //     <h1 className={"text-xl font-bold text-red-400"}>Editor</h1>
    //     <Link href={"/admin"}>Admin</Link>
    //   </main>
    // </div>
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
