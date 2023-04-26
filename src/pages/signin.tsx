import Layout from "../layout";
import Image from "next/image";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
} from "@tabler/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import type { GetServerSideProps } from "next";
import useZodForm from "@/hooks/use-zod-form";
import type { SignInUserType } from "@/schemas/validations";
import { SignInUser } from "@/schemas/validations";
import Input from "@/components/Global/Input/Input";
import type { SubmitHandler } from "react-hook-form";
import { input } from "@/utils/classess-constant";

const Sign = () => {
  const { data: sessionData } = useSession();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useZodForm({
    schema: SignInUser,
    defaultValues: {
      email: undefined,
    },
  });
  const router = useRouter();
  if (sessionData) {
    router.push("/").then();
  }

  const handleSignInEmail: SubmitHandler<SignInUserType> = async (values) => {
    await signIn("email", {
      email: values.email,
    });
  };

  return (
    <Layout>
      <div className="mx-auto mt-20 grid min-h-full	 max-w-7xl grid-cols-2  py-5">
        <div
          className={
            "col-span-2 max-w-md justify-self-center lg:col-span-1 lg:justify-self-center"
          }
        >
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-700">Sign in with</p>
              <div className="mt-2 grid grid-cols-3 gap-3 px-4">
                <button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                  <span className="sr-only">Sign in with Facebook</span>
                  <IconBrandFacebook className="h-5 w-5" />
                </button>
                <button
                  onClick={() => signIn("github")}
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Github</span>
                  <IconBrandGithub className="h-5 w-5" />
                </button>
                <button
                  onClick={() => signIn("discord")}
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitch</span>
                  <IconBrandDiscord className="h-5 w-5" />
                </button>
              </div>
              <div className={"mt-6"}>
                <div className="relative my-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div>
                  <form onSubmit={handleSubmit(handleSignInEmail)}>
                    <Input
                      register={register}
                      error={errors.email?.message}
                      name="email"
                      label="Email address"
                      type="email"
                      autoComplete="email"
                      labelClassName={input.label}
                      inputClassName={input.input(errors.email?.message)}
                      errorClassName={input.error}
                      placeholder="Email Address"
                    />

                    <button
                      type="submit"
                      className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      SIGN IN
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden min-h-full flex-1 lg:block">
          <Image
            width={700}
            height={700}
            className="h-full w-full "
            src={"/personWritting.png"}
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
};

export default Sign;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const serverSession = await unstable_getServerSession(req, res, authOptions);
  console.log({ serverSession });

  if (serverSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      serverSession,
    },
  };
};
