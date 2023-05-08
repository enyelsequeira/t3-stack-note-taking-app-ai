import Layout from "../layout";
import Image from "next/image";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
} from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import useZodForm from "@/hooks/use-zod-form";
import type { CreateUserType } from "@/schemas/validations";
import { CreateUser } from "@/schemas/validations";
import Input from "@/components/Global/Input/Input";
import type { SubmitHandler } from "react-hook-form";

import { input } from "@/utils/classess-constant";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  const { data } = useSession();

  if (data?.user) {
    router.push("/").then();
  }
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useZodForm({
    schema: CreateUser,
  });
  const handleSubmitForm: SubmitHandler<CreateUserType> = async (values) => {
    await signIn("email", {
      email: values.email,
    });
  };
  return (
    <Layout>
      <div className="mx-auto mt-20 grid min-h-full	 max-w-7xl grid-cols-2  py-5">
        <div className="relative hidden min-h-full flex-1 lg:block">
          <Image
            width={700}
            height={700}
            className="h-full w-full "
            src={"/personWritting.png"}
            alt="personal writing"
          />
        </div>
        <div
          className={
            "col-span-2 w-full max-w-md justify-self-center lg:col-span-1 lg:justify-self-center"
          }
        >
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign up to MomoMinder
            </h2>
            <div className="mt-8">
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
                  <form
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="space-y-6"
                  >
                    <Input
                      errorClassName={input.error}
                      labelClassName={input.label}
                      inputClassName={input.input(errors?.email?.message)}
                      placeholder="Email address"
                      type="email"
                      label="Email address"
                      register={register}
                      error={errors?.email?.message}
                      name="email"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
