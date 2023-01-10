import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

//  lets get the user by email from the database using prisma
export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
export const updateIsAdmin = async (email: string) => {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      isAdmin: true,
    },
  });
  return user;
};
export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return post;
};

export const authOptions: NextAuthOptions = {
  callbacks: {
    // async signIn({ user }) {
    //   console.log({ user });
    //   const authUser = await getUser(user.email as string);
    //   if (authUser && authUser.email === "enyelsequeira@hotmail.com") {
    //     //  if the user is the admin we update the isAdmin field to true
    //     try {
    //       await updateIsAdmin(user.email as string);
    //     } catch (error) {
    //       console.info("error could not update user", error);
    //     }
    //   }
    //   return true;
    // },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin =
          user.email === "enyelsequeira@hotmail.com" ? true : false;
        try {
          await updateIsAdmin(user.email as string);
        } catch (error) {
          console.log("object", error);
        }
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      // style: {
      //   text: "#7289da",
      //   bg: "#2c2f33",
      //   bgDark: "#23272a",
      //   logo: "#7289da",
      //   logoDark: "#7289da",
      //   textDark: "#ffffff",
      // },
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

export default NextAuth(authOptions);
