import { Icon360, IconArrowRight } from "@tabler/icons-react";
import Box from "../Global/Box/Box";
import { Button } from "../Global/Button/Button";
import Text from "../Global/Text/Text";

const Hero = () => {
  return (
    <Box as="section" className="relative px-6 lg:px-8">
      <Box container>
        <div>
          <div>
            <Text
              as="h1"
              className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl"
            >
              Simplify your workflow and boost{" "}
              <Text as="span" accent>
                productivity
              </Text>{" "}
              {""}
              with our powerful note-taking app
            </Text>

            <Text
              as="p"
              className="mt-6 text-lg leading-8 text-gray-600 sm:text-center"
            >
              This is a user-friendly note-taking app, designed by developers
              for developers to easily organize and streamline their thoughts
              and ideas. Experience lightning-fast and easy note-taking, with
              our markdown-friendly app. Create beautiful and organized notes
              with the help of our powerful helper and {""}
              <Text as="span" strong accent>
                AI tools.
              </Text>{" "}
            </Text>
            <div className="mt-8 flex items-center gap-x-4 sm:justify-center">
              <Button
                intention={"hero"}
                href={"/signup"}
                EndIcon={IconArrowRight}
              >
                Get started{" "}
              </Button>

              <Button intention={"subHero"} href={"/signin"} EndIcon={Icon360}>
                Sign In{" "}
              </Button>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </Box>
    </Box>
  );
};
export default Hero;
