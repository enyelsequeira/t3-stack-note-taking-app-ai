import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { ProfileSettings } from "@/views";
import type { GetServerSideProps } from "next";

export default ProfileSettings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
