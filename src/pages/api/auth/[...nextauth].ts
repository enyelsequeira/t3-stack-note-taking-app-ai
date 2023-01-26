import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import invariant from "tiny-invariant";
import EmailProvider from "next-auth/providers/email";

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
  // we have to match both email and username
  const user = await prisma.user.findFirst({
    // both email and username must match
    where: {
      email,
      username,
    },
  });

  if (!user) throw new Error("user not found");
  return user;
};

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, user }) {
      console.log({ SESSION: session, USER: user });
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // lets check is the user.email is env.ADMIN_EMAIL and if so, we will update the user to be an admin
      if (user.email === env.USER_ADMIN) {
        await updateIsAdmin(user?.email as string);
      }
      return true;
    },
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
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // we need a credentials provider to be able to login with email or username and password
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     email: { label: "Email", type: "email", placeholder: "email" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials, req) {
    //     invariant(credentials, "credentials are required");
    //     const user = await findUser(credentials?.email, credentials?.username);
    //     invariant(user, "user not found");
    //     invariant(user?.password, "password not found");
    //     const isPasswordValid = await bcrypt.compare(
    //       credentials?.password,
    //       user?.password
    //     );

    //     return isPasswordValid ? user : null;
    //   },
    // }),
  ],
};

export default NextAuth(authOptions);
