import Layout from "../../layout";
import { useCallback, useState } from "react";
import OwnEditor from "../../components/editor";
import Preview from "../../components/preview";
import { trpc } from "../../utils/trpc";

const EditorPage = () => {
  const [doc, setDoc] = useState<string>("# Hello, world");
  const { mutate, data } = trpc.GPT.testConversation.useMutation();
  const [handleInputChatGPT, setHandleInputChatGPT] = useState<string>("");
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <Layout>
      <div
        className={
          "mx-auto mt-6 grid max-w-[1440px] grid-cols-1 gap-2 border-2 border-green-200 lg:mt-24 lg:grid-cols-2 lg:gap-3"
        }
      >
        <OwnEditor initialDoc={doc} onChange={handleDocChange} />
        <Preview doc={doc} />
        <div>OPEN AI</div>
        <form>
          <input
            className={"w-full border-2 border-green-200 p-2"}
            type="text"
            value={handleInputChatGPT}
            onChange={(e) => setHandleInputChatGPT(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              mutate({
                input: handleInputChatGPT,
              });
            }}
          >
            Submit
          </button>
        </form>
        {/*    I want to see the values*/}
        <div className={"text-black"}>{JSON.stringify(data)}</div>
      </div>
    </Layout>
  );
};

export default EditorPage;
