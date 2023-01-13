import OwnEditor from "../components/editor";
import Preview from "../components/preview";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data: sessionData } = useSession();
  console.log({ sessionData });

  const [doc, setDoc] = useState<string>("# Hello, world");
  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  return (
    <>
      {sessionData?.user?.isAdmin ? (
        <div className={"grid  grid-cols-1 gap-4 md:grid-cols-2"}>
          <OwnEditor initialDoc={doc} onChange={handleDocChange} />
          <Preview doc={doc} />
        </div>
      ) : (
        <div>
          <h1>Not authorized</h1>
        </div>
      )}
    </>
  );
};

export default AdminPage;
