import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import invariant from "tiny-invariant";

import bcrypt from "bcrypt";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

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
export const findUser = async (email: string, username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        {
          email,
        },
      ],
    },
  });

  if (!user) throw new Error("user not found");
  return user;
};

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (!token) throw new Error("user not found");

      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.email = token.email as string;
      }
      // test
      return session;
    },
    async jwt({ token, user }) {
      if (!token) throw new Error("user not found");
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isAdmin = user.email === env.USER_ADMIN;
      }
      return token;
    },
    // if error is thrown, it will be caught by the error handler
  },

  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
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
    // we need a credentials provider to be able to login with email or username and password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await findUser(
          credentials?.email as string,
          credentials?.username as string
        );
        invariant(user?.password, "Password is required");

        invariant(credentials?.password, "Password is required");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        return isPasswordValid ? user : null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
