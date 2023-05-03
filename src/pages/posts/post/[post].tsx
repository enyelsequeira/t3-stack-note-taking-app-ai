import { trpc } from "../../../utils/trpc";
import Layout from "@/layout";
import Box from "@/components/Global/Box/Box";
import { useRouter } from "next/router";
import { Button, Text } from "@mantine/core";
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
import clsx from "clsx";
import { OwnTextArea } from "@/components/Form/TextArea";

const Post = () => {
  const router = useRouter();
  const { data: userData } = useSession();
  const [keywords, setKeywords] = useState<{ value: string; label: string }[]>(
    []
  );
  const { data, isLoading } = trpc.post.getByPostId.useQuery(
    {
      postId: router.query.post as string,
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
      description: data?.description as string,
    },
  });
  console.log({ router });

  useEffect(() => {
    if (!isLoading) {
      if (data && data.keywords) {
        setKeywords(
          data.keywords.map((keyword) => ({
            value: keyword,
            label: keyword,
          }))
        );
      }
    }
  }, [isLoading, data]);

  console.log({ wathcing: watch("description") });

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
        <Box container className="flex flex-col gap-y-6">
          <Text
            variant="gradient"
            gradient={{ from: "red", to: "blue", deg: 45 }}
            fw={700}
            className="pt-10 text-2xl"
          >
            {router.query?.edit ? "Edit Mode" : "Reading  Mode"}
          </Text>
          <OwnInput
            control={control}
            name="title"
            placeholder={data?.title}
            readOnly={!router.query?.edit}
            label="Title"
            classNames={{
              label: "mb-2 text-xl",
              input: clsx({
                "placeholder:text-black": !router.query?.edit,
              }),
            }}
          />
          <OwnMultiSelect
            classNames={{
              label: "mb-2 text-lg",
              searchInput: clsx({
                "placeholder:text-black": !router.query?.edit,
              }),
            }}
            readOnly={!router.query?.edit}
            control={control}
            name="keywords"
            data={keywords}
            creatable
            searchable
            getCreateLabel={(query) => `+ Create ${query}`}
            label="Choose 3 tags or create new"
            placeholder={data?.keywords?.join(", ")}
            maxSelectedValues={5}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setKeywords((current) => (current ? [...current, item] : [item]));
              return item;
            }}
          />
          <OwnTextArea
            readOnly={!router.query?.edit}
            name="description"
            control={control}
            placeholder={data?.description}
            label="Description"
            classNames={{
              label: "mb-2 text-lg",
              input: clsx({
                "placeholder:text-black": !router.query?.edit,
              }),
            }}
          />
          <Controller
            render={({ field }) => (
              <Editor
                edit={!!router.query?.edit}
                description={data?.text as string}
                onChange={field.onChange}
              />
            )}
            name="text"
            control={control}
          />
          <Button
            variant="outline"
            my={"md"}
            onClick={() => {
              mutate(
                {
                  keywords: watch("keywords"),
                  text: watch("text"),
                  title: watch("title"),
                  userId: userData?.user?.id as string,
                  postId: data?.id as string,
                  description: watch("description"),
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
            Finish Editing
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Post;
