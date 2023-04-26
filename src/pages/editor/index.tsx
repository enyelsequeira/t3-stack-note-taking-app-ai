import Layout from "../../layout";
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";
import useZodForm from "../../hooks/use-zod-form";
import type { ChatGPTForm } from "@/schemas/validations";
import { ChatGPTFormSchema, CreateNote } from "@/schemas/validations";
import type { SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";

const EditorPage = () => {
  const [doc, setDoc] = useState<string>("# Hello, world");
  const [updatedDoc, setUpdatedDoc] = useState<string>(doc);
  const [AIText, setAIText] = useState<string>("");
  const router = useRouter();

  const createNotes = trpc.post.createNote.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });
  const handleDocChange = useCallback((newDoc: string) => {
    setUpdatedDoc(newDoc); // Update this line
  }, []);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useZodForm({
    schema: ChatGPTFormSchema,
    defaultValues: {
      input: "",
    },
  });
  const createNote = useZodForm({
    schema: CreateNote,
  });

  const generate: SubmitHandler<ChatGPTForm> = async (values) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: values.input,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = response.body;
    if (!data) return;
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAIText((prev) => prev + chunkValue);
      reset();
    }
  };

  return <Layout>EDITOR</Layout>;
};

export default EditorPage;
