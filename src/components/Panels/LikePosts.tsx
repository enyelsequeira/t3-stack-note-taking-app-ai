import { Tab } from "@headlessui/react";
import { Text } from "@mantine/core";
import PostsCard from "../PostCards";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const LikedPanel = () => {
  const { data } = useSession();
  const { data: likedPosts } = trpc.post.getLikedPosts.useQuery(
    { userId: data?.user?.id as string },
    { enabled: !!data?.user?.id }
  );
  console.log({ likedPosts });
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
        Liked post
      </Text>
      {likedPosts?.length ? (
        likedPosts.map((item, index) => {
          return (
            <PostsCard key={index} by={item.user.name as string} post={item} />
          );
        })
      ) : (
        <Text
          className="col-span-2 my-3 text-2xl"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          ta="center"
          fw={700}
        >
          You have no posts yet
        </Text>
      )}
    </Tab.Panel>
  );
};

export default LikedPanel;
