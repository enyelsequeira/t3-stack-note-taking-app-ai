import { Dialog } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { navigation } from "./header";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
};
const MobileHeader = ({ mobileMenuOpen, setMobileMenuOpen }: Props) => {
  const { data: sessionData } = useSession();

  return (
    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
        <div className="flex h-9 items-center justify-between">
          <div className="flex">
            <Link href={"/"}>
              <span className="sr-only">Your Company</span>
              <Image
                className={"round h-9 w-9"}
                src="/main1.svg"
                alt="Main-logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <IconX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              {sessionData ? (
                <>
                  <div className="mx-2 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Welcome {sessionData?.user?.name}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    {" "}
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/signin"
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileHeader;
