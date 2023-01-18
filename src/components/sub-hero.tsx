import Image from "next/image";
import Box from "./Global/Box/Box";
import Text from "./Global/Text/Text";

const features = [
  {
    name: "Easy note organization",
    description:
      "Easily categorize and organize your notes by creating notebooks, tagging, and searching through them with ease.",
  },
  {
    name: "Markdown support",
    description:
      "Create notes using markdown formatting, making it easy to format and add structure to your notes.",
  },
  {
    name: "Auto-saving",
    description:
      "Never lose your notes again with auto-saving feature, your notes will be saved automatically as you type.",
  },
  {
    name: "AI-powered search",
    description:
      "Search through your notes with ease, using our powerful AI algorithms to quickly find what you need, even in large notebooks.",
  },
];

const SubHero = () => {
  return (
    <Box
      as={"section"}
      className="mx-auto mt-10 grid w-full max-w-screen-2xl  grid-cols-1 border  md:grid-cols-2 "
    >
      <Box as="div" className=" mx-auto ">
        <Image
          src="/notebook-coffee.png"
          width={700}
          height={900}
          alt="cofee"
        />
      </Box>
      <Box
        as="article"
        className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32"
      >
        <div className="lg:col-span-2">
          <Text
            variant="h2/true"
            size={"h6"}
            // className="font-medium text-gray-500"
          >
            For Developers by Developers
          </Text>
          <Text
            as="p"
            className="mt-4 text-4xl font-bold tracking-tight text-gray-900"
          >
            Revolutionize Your Note-taking: Our AI-Powered App{" "}
          </Text>
          <Text as="p" className="mt-4 text-gray-500">
            Streamline your workflow and boost productivity with our
            cutting-edge AI technology
          </Text>

          <dl className="mt-10 grid grid-cols-1 gap-y-10 gap-x-8 text-sm sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Box>
    </Box>
  );
};

export default SubHero;
// beautifull simple website for datacabling company including fiber optics, light blue, teal premium,ux,ui , ux/ui ,website, 8K quality --v 4 --stylize 750 --q 2 --s 20000 --upbeta
// beautifull premium website for IT company , premium,ux,ui , ux/ui ,website, 8K quality --v 4 --stylize 750 --q 2 --s 20000 --upbeta
