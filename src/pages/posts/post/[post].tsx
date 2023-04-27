// import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import Layout from "@/layout";
import Box from "@/components/Global/Box/Box";
import { useRouter } from "next/router";
import { Button, Skeleton } from "@mantine/core";
import { OwnInput } from "@/components/Form/Input";
import useZodForm from "@/hooks/use-zod-form";
import { CreateNote } from "@/schemas/validations";
import { OwnMultiSelect } from "@/components/Form/MultiSelect";
import { useEffect, useState } from "react";
import Editor from "@/components/Editor";
import { Controller } from "react-hook-form";
import { TRPCClientError } from "@trpc/client";
import { notifications } from "@mantine/notifications";
import { IconError404 } from "@tabler/icons";
import { useSession } from "next-auth/react";

const Post = () => {
  const router = useRouter();
  const { data: userData } = useSession();

  const { data, isLoading, error } = trpc.post.getById.useQuery(
    {
      id: router.query.post as string,
    },
    {
      enabled: !!router.query.post,
    }
  );
  const { mutate } = trpc.post.updatePost.useMutation();
  const { control, watch } = useZodForm({
    schema: CreateNote,
    values: {
      title: data?.title as string,
      keywords: data?.keywords as string[],
      text: data?.text as string,
    },
  });
  console.log({ router });

  if (isLoading) {
    return <Skeleton className="mt-7" visible={isLoading}></Skeleton>;
  }
  const handleDoneClick = () => {
    if (router.asPath) {
      const newPath = (router.asPath ?? "").split("?")[0];
      if (newPath) {
        router.replace(newPath);
      }
    }
  };

  return (
    <Layout>
      <Box as="section" className="relative px-6 lg:px-8">
        <Button
          variant="outline"
          // when we click we should remove the ?edit=true from the path
          // onClick={handleDoneClick}
          onClick={() => {
            mutate(
              {
                keywords: watch("keywords"),
                text: watch("text"),
                title: watch("title"),
                userId: userData?.user?.id as string,
                postId: data?.id as string,
              },
              {
                onError: (error) => {
                  console.log({ error });
                  if (error instanceof TRPCClientError) {
                    notifications.show({
                      icon: <IconError404 />,
                      message: error.message,
                    });
                  } else {
                    notifications.show({
                      icon: <IconError404 />,
                      message: "Something went wrong with Post Creation",
                    });
                  }
                },
                onSuccess: () => {
                  notifications.show({
                    message: "Post Updated",
                    title: "Success",
                  });
                  handleDoneClick();
                },
              }
            );
          }}
        >
          DONE
        </Button>
        <p>{router.query?.edit ? "edit Mode" : "VIEW MODE"}</p>
        <Box container>
          <OwnInput
            control={control}
            name="title"
            placeholder={data?.title}
            readOnly={!router.query?.edit}
          />
          <OwnMultiSelect
            control={control}
            readOnly={!router.query?.edit}
            name="keywords"
            data={[]}
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            label="Choose 3 tags or create new"
            placeholder={data?.keywords?.join(", ")}
          />
          <Controller
            render={({ field }) => (
              <Editor
                edit={false}
                description={data?.text as string}
                onChange={field.onChange}
              />
            )}
            name="text"
            control={control}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Post;
// http://localhost:3000/posts/post/clgzfes8x000atlg9iu0xz8ta?edit=true

// userId: "clgzfdz0r0006tlg9u1043wus";
