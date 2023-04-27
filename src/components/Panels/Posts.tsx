import { Tab } from "@headlessui/react";
import PostsCard from "../PostCards";
import { Text } from "@mantine/core";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const PostPanel = () => {
  const { data } = useSession();
  // console.log({router})
  const { data: userPost } = trpc.post.getByUserId.useQuery(
    { userId: data?.user?.id as string },
    { enabled: !!data?.user?.id }
  );

  console.log({ userPost });

  return (
    <Tab.Panel className={"grid grid-cols-2 gap-3 py-4 px-2"}>
      <Text
        className="col-span-2 my-3 text-2xl"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        // sx={{ fontFamily: "Greycliff CF, sans-serif" }}
        ta="center"
        fw={700}
      >
        All your posts in one place
      </Text>
      {userPost?.length ? (
        userPost.map((item, index) => {
          return <PostsCard key={index} {...item} />;
        })
      ) : (
        <Text
          className="col-span-2 my-3 text-2xl"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          // sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          ta="center"
          fw={700}
        >
          You have no posts yet
        </Text>
      )}
    </Tab.Panel>
  );
};

export default PostPanel;
