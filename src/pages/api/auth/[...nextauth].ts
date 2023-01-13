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
    async session({ session, user }) {
      console.log({ session, user });

      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.email === "enyelsequeira@hotmail.com";
        session.user.email = user.email;
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
  pages: {
    signIn: "/sign",
  },

  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
