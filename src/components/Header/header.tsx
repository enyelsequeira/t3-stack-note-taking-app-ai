import { IconMenu } from "@tabler/icons";
import { useState } from "react";
import MobileHeader from "./mobile-header";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../Global/Button/Button";
import { trpc } from "../../utils/trpc";

export const navigation = [
  { name: "Product", href: "/editor" },
  { name: "Features", href: "/features" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
const Header = () => {
  const { data: sessionData } = useSession();
  const utils = trpc.useContext();
  const { data } = trpc.user.byId.useQuery(
    {
      id: sessionData?.user?.id as string,
    },
    { enabled: !!sessionData?.user?.id }
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="px-6 pt-6 lg:px-8">
      <div>
        <nav
          className="flex h-9 items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
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
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <IconMenu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-semibold text-gray-900 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            {sessionData ? (
              <>
                <Button
                  onMouseEnter={() => {
                    utils.user.byId.prefetch({
                      id: sessionData.user?.id as string,
                    });
                  }}
                  href={`/profile/${sessionData.user?.id}`}
                  className="mx-2 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  Welcome{" "}
                  {sessionData?.user?.name ?? data?.username?.slice(0, 5)}
                </Button>

                <Button
                  onClick={async () => {
                    try {
                      signOut();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  {" "}
                  Log out
                </Button>
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
        </nav>
        <MobileHeader
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </div>
  );
};
export default Header;
