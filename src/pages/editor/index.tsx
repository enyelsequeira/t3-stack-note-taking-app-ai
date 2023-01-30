import Layout from "../../layout";
import { useCallback, useState } from "react";
import OwnEditor from "../../components/editor";
import Preview from "../../components/preview";
import { trpc } from "@/utils/trpc";
import useZodForm from "../../hooks/use-zod-form";
import type { ChatGPTForm} from "@/schemas/validations";
import { ChatGPTFormSchema, CreateNote } from "@/schemas/validations";
import type { SubmitHandler} from "react-hook-form";
import { Controller  } from "react-hook-form";
import { useRouter } from "next/router";

const EditorPage = () => {
  const [doc, setDoc] = useState<string>("# Hello, world");
  const [AIText, setAIText] = useState<string>("")
  const router = useRouter();

  const createNotes = trpc.post.createNote.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);
  const { handleSubmit, register, formState:{isSubmitting}, reset} = useZodForm({
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
        prompt: values.input
      }),
    })
    if(!response.ok) {
      throw new Error(response.statusText);

    }
    const data = response.body;
    if(!data)  return;
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false;
    while (!done) {
      const {value, done: doneReading} = await reader.read();
      done = doneReading
      const chunkValue = decoder.decode(value)
      setAIText((prev) => prev + chunkValue);
      reset()
    }
  }


  return (
    <Layout>
      <section className={"mx-auto flex w-full max-w-[1440px] flex-col"}>
        <form
          onSubmit={createNote.handleSubmit(async (values) => {
            await createNotes.mutate(values);
          })}
          className={
            " mt-6 grid  grid-cols-1 gap-2 border-2 border-blue-200 lg:mt-24 lg:grid-cols-2 lg:gap-3"
          }
        >
          <div className={"col-span-2"}>
            <div className="mb-4 flex flex-col">
              <label className="text-xl text-gray-600">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...createNote.register("title")}
                type="text"
                className="w-full max-w-xl rounded-xl border-2 border-gray-300 bg-amber-100 p-2"
                name="title"
                id="title"
                placeholder={"Please enter a title"}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="text-xl text-gray-600">
                Keywords <span className="text-red-500">*</span>
              </label>
              <input
                {...createNote.register("keywords")}
                type="text"
                placeholder={"Please enter keywords separated by spaces"}
                className="w-full max-w-xl rounded-xl border-2 border-gray-300 bg-amber-100 p-2"
                name="title"
                id="title"
                required
              />
            </div>
          </div>
          <Controller
            render={({ field: { onChange } }) => {
              return (
                <OwnEditor
                  initialDoc={doc}
                  onChange={(newDoc) => {
                    console.log({ correctDoc: newDoc.replace(/\n/g, " ") });
                    // this is correct however when \n  is in the string it will create a new line in the editor
                    onChange(newDoc);

                    // onChange(newDoc);
                    handleDocChange(doc);
                  }}
                />
              );
            }}
            name={"content"}
            control={createNote.control}
          />

          <Preview doc={doc} />
          <div className={"col-span-2 mx-auto"}>
            <div className="mx-auto flex h-16 w-64 items-center justify-center">
              <button
                type={"submit"}
                className="i absolute h-16 w-64 transform cursor-pointer items-center overflow-hidden rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl transition duration-300 ease-out hover:scale-x-110 hover:scale-y-105"
              ></button>
              <a className="pointer-events-none z-10 text-center font-semibold text-white">
                Hover on me!
              </a>
            </div>
            {JSON.stringify(createNote.watch())}
          </div>
        </form>

        <div>OPEN AI</div>

        <form
          onSubmit={handleSubmit(async (values) => {
            await generate(values)
          })
          }
        >
          <input
            {...register("input")}
            className={"w-full border-2 border-green-200 p-2"}
            type="text"
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {AIText && (
                <div className={"p-2 border rounded-md"}>
                  {AIText
                    .split("\n")
                    .map((AIText) => {
                        return (
                          <>
                            <p  key={AIText}>{AIText}</p>
                          </>

                        );

                      }
                    )}
                </div>

          )}
        </form>

      </section>
    </Layout>
  );
};

export default EditorPage;
