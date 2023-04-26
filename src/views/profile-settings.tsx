import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import Box from "../components/Global/Box/Box";
import ProfileBasicInfo from "../components/Settings/Profile/profile";
import Layout from "../layout";
import { subNavigation } from "../utils/constants";
import PostsCard from "@/components/PostCards";
import { Text } from "@mantine/core";
import PostPanel from "@/components/Panels/Posts";

const ProfileSettings = () => {
  return (
    <Layout>
      <>
        {/* blue line */}
        <div className="relative mt-8 overflow-hidden bg-black pb-32">
          <div
            aria-hidden="true"
            className={
              "absolute inset-y-0 inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0"
            }
          >
            <div className="absolute inset-0 flex">
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#0a527b" }}
              />
              <div
                className="h-full w-1/2"
                style={{ backgroundColor: "#065d8c" }}
              />
            </div>
            <div className="relative flex justify-center">
              <svg
                className="flex-shrink-0"
                width={1750}
                height={308}
                viewBox="0 0 1750 308"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                  fill="#0369a1"
                />
                <path
                  d="M1465.84 308L16.816 0H1750v308h-284.16z"
                  fill="#065d8c"
                />
                <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                <path
                  d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                  fill="#0a4f76"
                />
              </svg>
            </div>
          </div>

          <Box as="section" className="relative py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Settings
              </h1>
            </div>
          </Box>
        </div>
        {/* end of blue Line */}

        <Box as="section" className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                {/* Tabs */}
                <Tab.Group vertical as={Fragment}>
                  <aside className="py-6 lg:col-span-3">
                    <Tab.List
                      className={
                        "group flex flex-col  px-3 py-2 text-sm font-medium"
                      }
                    >
                      {subNavigation.map((item) => (
                        <Tab
                          key={item.name}
                          className={({ selected }) =>
                            clsx(
                              selected
                                ? "border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                                : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                              "group flex cursor-pointer items-center border-l-4 px-3 py-2 text-sm font-medium outline-none"
                            )
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={clsx(
                              item.current
                                ? "text-teal-500 group-hover:text-teal-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </Tab>
                      ))}
                    </Tab.List>
                  </aside>

                  <div className="divide-y divide-gray-200 lg:col-span-9">
                    <Tab.Panels className="py-6 px-4 sm:p-6 lg:pb-8">
                      <Tab.Panel className="divide-y divide-gray-200 lg:col-span-9">
                        <ProfileBasicInfo />
                      </Tab.Panel>
                      <PostPanel />
                      <Tab.Panel>3</Tab.Panel>
                      <Tab.Panel>4</Tab.Panel>
                      <Tab.Panel>5</Tab.Panel>
                      <Tab.Panel>6</Tab.Panel>
                    </Tab.Panels>
                  </div>
                </Tab.Group>

                {/*  */}
              </div>
            </div>
          </div>
        </Box>
      </>
    </Layout>
  );
};

export default ProfileSettings;
