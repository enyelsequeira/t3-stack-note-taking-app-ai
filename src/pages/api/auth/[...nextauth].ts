import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import { faker } from "@faker-js/faker";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

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
  if (!user) throw new Error("user not found");
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
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },

    //! this will break the first time around JUST FYI
    async signIn({ user }) {
      try {
        if (user.email === env.USER_ADMIN) {
          await updateIsAdmin(user?.email as string);
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (!existingUser) {
          const generateUniqueUsername = () =>
            faker.helpers.unique(faker.internet.userName, [], {
              maxTime: 1000,
              maxRetries: 10,
            });

          let randomUsername = generateUniqueUsername();

          while (
            await prisma.user.findUnique({
              where: { username: randomUsername },
            })
          ) {
            randomUsername = generateUniqueUsername();
          }

          await prisma.user.create({
            data: {
              ...user,
              id: undefined,
              username: randomUsername,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        // Handle the error according to your application's requirements
        // For example, you can throw a specific error or return false
        return false;
      }
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
        port: process.env.EMAIL_SERVER_PORT as any,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        return new Promise((resolve, reject) => {
          const transporter = createTransport(server);
          const message = {
            from,
            to: email,
            subject: "Sign in to Memominder App",
            text: `Sign To Memominder: ${url}`,
            html: `
            <div style="background-color: #f5f5f5; padding: 20px; 
            display: flex; justify-content: center; align-items: center;
            ">

            <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center; 
            flex-direction: column;
            ">
              <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #333;">Sign in to Memominder App</h1>
              <p style="margin: 0; font-size: 16px; font-weight: 400; color: #333;">Click the button below to sign in to your account.</p>
              <a target="_blank" href="${url}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #333; color: #fff; border-radius: 5px; text-decoration: none;">Sign in</a>
            </div>
            </div>
            `,
          };
          transporter.sendMail(message, (error: any, info: any) => {
            if (error) {
              console.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
              return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR", error));
            }
            console.log("SEND_VERIFICATION_EMAIL", email, info.envelope);
            return resolve();
          });
        });
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
