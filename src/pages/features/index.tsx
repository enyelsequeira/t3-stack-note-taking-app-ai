import Layout from "@/layout";

import type { SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@mantine/core";
import { IconError404, IconHash } from "@tabler/icons-react";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { notifications } from "@mantine/notifications";
import useZodForm from "@/hooks/use-zod-form";
import type { NoteCreation } from "@/schemas/validations";
import { CreateNote } from "@/schemas/validations";
import { OwnInput } from "@/components/Form/Input";
import { OwnMultiSelect } from "@/components/Form/MultiSelect";
import { TRPCClientError } from "@trpc/client";
import Editor from "@/components/Editor";
import { OwnTextArea } from "@/components/Form/TextArea";

const Features = () => {
  // const { data } = useSession();
  // console.log({ data });
  const content = ` <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
      <img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />`;
  const { mutate } = trpc.post.createNote.useMutation();

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
      onSuccess: () => {
        notifications.show({
          message: "Post Created",
          title: "Success",
        });
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
          icon={<IconHash size={12} />}
          data={data}
          searchable
          radius={"md"}
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
        <OwnTextArea
          name="description"
          label="Description"
          control={control}
          classNames={{
            root: "max-w-md w-full xl:pl-16",
            label: "mb-1 text-lg",
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
