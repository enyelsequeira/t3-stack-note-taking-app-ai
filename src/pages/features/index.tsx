import Layout from "@/layout";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Editor from "@/components/editor";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { IconError404, IconHash } from "@tabler/icons";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { notifications } from "@mantine/notifications";
import useZodForm from "@/hooks/use-zod-form";
import { CreateNote, NoteCreation } from "@/schemas/validations";
import { OwnInput } from "@/components/Form/Input";
import { OwnMultiSelect } from "@/components/Form/MultiSelect";
import { TRPCClientError } from "@trpc/client";

// const content =
//   '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const Features = () => {
  // const { data } = useSession();
  // console.log({ data });
  const content = `<h1>Hello World</h1>`;
  const { mutate, mutateAsync } = trpc.post.createNote.useMutation();

  const { formState, watch, handleSubmit, control } = useZodForm({
    schema: CreateNote,
    defaultValues: {
      text: content,
    },
  });

  const [data, setData] = useState([
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ]);

  const submitPost: SubmitHandler<NoteCreation> = (data) => {
    mutate(data, {
      onError: (error) => {
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
    });
  };
  console.log({ datA: watch() });

  return (
    <Layout>
      <form
        id="post"
        onSubmit={handleSubmit(submitPost)}
        className="mx-auto mt-10 flex max-w-7xl flex-col space-y-3"
      >
        <OwnInput
          control={control}
          name="title"
          placeholder="Your Title"
          label="Post Title"
          withAsterisk
          radius={"md"}
          className="text-"
          classNames={{
            root: `max-w-md w-full xl:pl-16 ${
              formState.errors.title ? "border-red-500" : ""
            }`,
            label: "mb-2 text-lg",
          }}
        />
        <OwnMultiSelect
          control={control}
          name="keywords"
          classNames={{
            root: "max-w-md w-full xl:pl-16",
            label: "mb-1 text-lg",
          }}
          icon={<IconHash />}
          data={data}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }}
          label="Choose 3 tags or create new"
          placeholder="Choose tags or Create"
          maxSelectedValues={5}
          transitionProps={{
            duration: 150,
            transition: "pop-top-left",
            timingFunction: "ease",
          }}
        />
        <Controller
          render={({ field }) => (
            <Editor description={field.value} onChange={field.onChange} />
          )}
          name="text"
          control={control}
        />
        <Button
          form="post"
          type="submit"
          variant="outline"
          mt={10}
          w="fit-content"
          m={"auto"}
        >
          Save post
        </Button>
      </form>
    </Layout>
  );
};

export default Features;
