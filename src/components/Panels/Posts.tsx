import { Tab } from "@headlessui/react";
import PostsCard from "../PostCards";
import { Text } from "@mantine/core";
import { trpc } from "@/utils/trpc";

const PostPanel = () => {
  const { data: userPost } = trpc.post.getByUserId.useQuery();

  return (
    <Tab.Panel className={"grid grid-cols-2 gap-3 py-4 px-2"}>
      <Text
        className="col-span-2 my-3 text-2xl"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        ta="center"
        fw={700}
      >
        All your posts in one place
      </Text>

      {userPost?.length ? (
        userPost.map((item, index) => {
          return <PostsCard key={index} post={item} />;
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

export default PostPanel;
