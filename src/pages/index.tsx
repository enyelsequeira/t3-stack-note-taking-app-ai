/* eslint-disable react/no-children-prop */
import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { trpc } from "../utils/trpc";
import Layout from "../layout";
import Hero from "../components/hero";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ImagePreview } from "../components/preview";
import SubHero from "../components/sub-hero";
import Features from "../components/features";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.post.getAll.useQuery();

  return (
    <Layout>
      <Hero />
      <SubHero />
      <Features />
      {/* <div className={"text-red-400"}>
        {data &&
          data.map((d) => {
            return (
              <>
                <h1>{d.title}</h1>
                <ReactMarkdown
                  className={"prose prose-h1:text-red-400"}
                  children={d.text}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    image: ImagePreview,

                    code({
                      node,
                      inline,
                      className,
                      children,
                      style,
                      ...props
                    }) {
                      console.log({ props });
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={prism}
                          children={String(children).replace(/\n$/, "")}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </>
            );
          })}
      </div> */}
    </Layout>
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
