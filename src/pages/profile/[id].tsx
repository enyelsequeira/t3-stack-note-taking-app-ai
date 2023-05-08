import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { ProfileSettings } from "@/views";
import type { GetServerSideProps } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/server/trpc/router/_app";
import superjson from "superjson";
import { prisma } from "../../../src/server/db/client";

export default ProfileSettings;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma,
    },
    transformer: superjson,
  });
  await ssg.post.getByUserId.prefetch();
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
      trpcState: ssg.dehydrate(),
    },
  };
};
