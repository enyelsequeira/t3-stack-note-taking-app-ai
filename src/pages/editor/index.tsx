import Layout from "../../layout";
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";
import useZodForm from "../../hooks/use-zod-form";
import type { ChatGPTForm } from "@/schemas/validations";
import { ChatGPTFormSchema, CreateNote } from "@/schemas/validations";
import type { SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";
import PostsCard from "@/components/PostCards";

const EditorPage = () => {
  const { data } = trpc.post.getAll.useQuery();
  console.log({ data });

  return (
    <Layout>
      <div className="mt-10 grid grid-cols-4 px-5">
        {data?.map((dta) => {
          return <PostsCard key={dta.id} {...dta} />;
        })}
      </div>
    </Layout>
  );
};

export default EditorPage;
