import { Button } from "@/components/Global/Button/Button";
import CountrySelect from "@/components/Select/country-select";
import useZodForm from "@/hooks/use-zod-form";
import type { UpdateUserSchemaType } from "@/schemas/validations";
import { UpdateUserSchema } from "@/schemas/validations";
import Image from "next/image";
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import Input from "../../Global/Input/Input";
import Text from "../../Global/Text/Text";
import { getNames, getName } from "country-list";
import { useEffect, useState } from "react";
import type { ImageListType } from "react-images-uploading";
import ImageUploading from "react-images-uploading";
import { supabase } from "@/utils/supabase";

const ProfileBasicInfo = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);

  const { id } = router.query;
  const utils = trpc.useContext().user;

  const countries = getNames();

  const { data, isLoading } = trpc.user.byId.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  const mutateUser = trpc.user.updateById.useMutation({
    onSuccess: () => {
      utils.invalidate();
    },
  });

  const [selectedCountry, setSelectedCountry] = useState(
    getName((data?.location as string) || "US")
  );

  const methods = useZodForm({
    schema: UpdateUserSchema,
    mode: "onSubmit",
  });

  const handleSubmitForm: SubmitHandler<UpdateUserSchemaType> = async (
    values
  ) => {
    mutateUser.mutate({
      id: id as string,
      values,
    });
  };
  useEffect(() => {
    if (!isLoading) {
      setSelectedCountry(getName((data?.location as string) ?? "US"));
    }
  }, [isLoading, data?.location]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)}>
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <Text
              as="h2"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Profile
            </Text>
            <Text as="p" className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </Text>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="group mt-1 flex rounded-md shadow-sm ">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 focus:border-sky-500 sm:text-sm">
                    MemoMinder.com/
                  </span>
                  <input
                    type="text"
                    id="username"
                    autoComplete="username"
                    placeholder={data?.username || "Username"}
                    className={`block  w-full min-w-0 flex-grow rounded-none rounded-r-md border border-l-0 border-gray-300 py-2  focus:border-sky-500  focus:outline-none focus:ring-sky-500 sm:text-sm ${
                      methods?.formState?.errors?.username && "border-red-500"
                    }`}
                    {...methods.register("username")}
                  />
                </div>
                {methods?.formState?.errors?.username && (
                  <p className="text-sm text-red-600">
                    {methods.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    placeholder={data?.bio || "Bio"}
                    rows={3}
                    className={`mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm outline-none focus:border-sky-500 focus:outline-none sm:text-sm   ${
                      methods?.formState?.errors?.bio && "border-red-500"
                    }`}
                    defaultValue={""}
                    {...methods.register("bio")}
                  />
                </div>
                <Text className={"text-sm text-red-600"}>
                  {methods?.formState?.errors?.bio?.message || " "}
                </Text>
                <Text as="p" className="mt-2 text-sm text-gray-500">
                  Brief description for your profile. URLs are hyperlinked.
                </Text>
              </div>
            </div>

            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
              <p
                className="text-sm font-medium text-gray-700"
                aria-hidden="true"
              >
                Photo
              </p>
              <div className="mt-1 lg:hidden">
                <div className="flex items-center">
                  <div
                    className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    {data && data?.image && (
                      <Image
                        src={data?.image}
                        blurDataURL={data?.image}
                        placeholder="blur"
                        alt={(data && data?.email) || ""}
                        className="relative h-12 w-12 rounded-full"
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <div className="ml-5 rounded-md shadow-sm">
                    <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                      <label
                        htmlFor="mobile-user-photo"
                        className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {data && (
                <ImageUploading
                  value={images}
                  onChange={async (d: any) => {
                    // console.log("onChange", d[0].file);

                    // using supabase storage, all I want to do is update the image every time he selects a new one,
                    // we don't need to delete the old one, we just need to update the image itself and we need to update the image url in the database
                    const { data, error } = await supabase.storage

                      .from("profile-images")
                      .update(`${router.query.id}-profile`, d[0].file, {
                        cacheControl: "100",
                        upsert: true,
                      });

                    // const { data, error } = await supabase.storage
                    //   .from("profile-images")
                    //   .update(`${router.query.id}-profile`, d[0].file);

                    if (error) {
                      throw new Error(error.message);
                    }
                  }}
                  acceptType={["jpg", "png", "gif"]}
                  maxNumber={1}
                >
                  {({ onImageUpload }) => (
                    // write your building UI
                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      <div className="relative h-40 w-40 rounded-full">
                        {data && data?.image && (
                          <img src={data.image} />
                          // <Image
                          //   src={data.image}
                          //   blurDataURL={data?.image}
                          //   placeholder="blur"
                          //   alt={(data && data?.email) || "profile logo"}
                          //   className="relative h-40 w-40 rounded-full"
                          //   width={160}
                          //   height={160}
                          // />
                        )}

                        <button
                          className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                          onClick={onImageUpload}
                        >
                          change
                        </button>
                      </div>
                    </div>
                  )}
                </ImageUploading>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <Input
              wrapperClassName="col-span-12 sm:col-span-6"
              labelClassName="block text-sm font-medium text-gray-700"
              inputClassName="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              errorClassName="text-red-600 text-sm"
              name="firstName"
              label="First name"
              type="text"
              autoComplete="given-name"
              register={methods.register}
              error={methods?.formState?.errors?.firstName?.message}
              placeholder={data?.firstName || "First Name"}
            />
            <Input
              wrapperClassName="col-span-12 sm:col-span-6"
              labelClassName="block text-sm font-medium text-gray-700"
              inputClassName="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              errorClassName="text-red-600 text-sm"
              name="lastName"
              label="Last name"
              type="text"
              autoComplete="family-name"
              register={methods.register}
              error={methods?.formState?.errors?.lastName?.message}
              placeholder={data?.lastName || "Last Name"}
            />
            <Input
              wrapperClassName="col-span-12"
              errorClassName="text-red-600 text-sm"
              labelClassName="block text-sm font-medium text-gray-700"
              inputClassName="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              name="portfolio"
              label="Portfolio URL"
              type="text"
              register={methods.register}
              error={methods?.formState?.errors?.portfolio?.message}
              placeholder={data?.portfolio || "Portfolio URL"}
            />
            <Input
              wrapperClassName="col-span-12 sm:col-span-6"
              errorClassName="text-red-600 text-sm"
              name="profileUrl"
              label="Company"
              type="text"
              labelClassName="block text-sm font-medium text-gray-700"
              inputClassName="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              register={methods.register}
              error={methods?.formState?.errors?.profileUrl?.message}
              placeholder={data?.profileUrl || "Company Name"}
            />

            <Controller
              control={methods.control}
              name="location"
              defaultValue={data?.location || ""}
              render={({ field: { onChange } }) => (
                <CountrySelect
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  countries={countries}
                  onChange={(e: string) => {
                    onChange(e);
                    setSelectedCountry(e);
                  }}
                />
              )}
            />

            {/* <div className="flex flex-col font-black text-red-400">
              {JSON.stringify(data)}
            </div> */}
          </div>
        </div>
        {/* Privacy section */}
        {/* <PrivacyProfile /> */}
        <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
          <Button
            type="submit"
            disabled={mutateUser.isLoading}
            intention="save"
          >
            {mutateUser.isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>

      {/* <p>
        {Object.entries(methods?.formState?.errors).map(([key, value]) => (
          <p key={key}>{value.message}</p>
        ))}
      </p> */}
    </FormProvider>
  );
};

export default ProfileBasicInfo;
