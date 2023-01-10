import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
//   console.log({ session, user });
//   // if the user email already exist in the db that means that the user is already created and we can just return the session
//   if (user) {
//     return session;
//   }
//   // if the user email does not exist in the db that means that the user is not created yet and we need to create the user in the db
//   if (!user) {
//     const user = await getUser({ email: session.user.email });
//     if (user) {
//       return session;
//     }
//     const newUser = await prisma.user.create({
//       data: {
//         email: session?.user.email,
//         name: session?.user.name,
//       },
//     });
//     session?.user.id = newUser.id;
//     return session;
//   }
// },
