import { trpc } from "@/utils/trpc";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  ActionIcon,
  createStyles,
  rem,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { Post } from "@prisma/client";
import {
  IconBookmark,
  IconHash,
  IconShare,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

type Props = {
  by?: string;
  post: Post;
};

function PostsCard({ by, post: { id, title, keywords, description } }: Props) {
  const { classes, theme } = useStyles();
  const { data } = useSession();
  const { post } = trpc.useContext();
  const { data: whoLikedPost } = trpc.post.getPeopleWhoLikedPost.useQuery({
    postId: id,
  });

  const { mutate } = trpc.post.toggleLikePost.useMutation();
  const features = keywords.map((keyword, i) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={i}
      leftSection={<IconHash size={12} />}
    >
      {keyword}
    </Badge>
  ));
  const { data: likedPosts } = trpc.post.getLikedPosts.useQuery();

  const isPostLiked = likedPosts?.some((item) => item.id === id);
  console.log({ whoLikedPost });
  return (
    <Card withBorder radius="md" p="xs" className={classes.card}>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt={title}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title} {`${by ? `Author:  ${by}` : ""}`}
          </Text>
          <Badge
            size="sm"
            className="cursor-pointer"
            component={Link}
            href={{
              pathname: `/posts/post/${id}`,
              query: { edit: true },
            }}
          >
            Edit
          </Badge>
        </Group>
        <Text fz="sm" mt="xs" lineClamp={4}>
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text my="xs" className={classes.label} c="dimmed">
          Keywords
        </Text>

        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            Liked by:
            {whoLikedPost &&  whoLikedPost?.length === 0
              ? "No one"
              : whoLikedPost?.length === 1
              ? whoLikedPost?.[0]?.name
              : `${whoLikedPost?.[0]?.name} and ${
                  whoLikedPost?.length - 1
                } other${whoLikedPost?.length > 2 ? "s" : ""}`}
          </Text>

          <Group spacing={0}>
            <ActionIcon
              onClick={() => {
                mutate(
                  {
                    postId: id,
                    userId: data?.user?.id as string,
                  },
                  {
                    onSuccess() {
                      if (isPostLiked) {
                        notifications.show({
                          title: "Post unliked",
                          message: "Post unliked successfully",
                        });
                      } else {
                        notifications.show({
                          title: "Post liked",
                          message: "Post liked successfully",
                        });
                      }
                      post.invalidate();
                    },
                    onError(error) {
                      console.log({ error });
                      notifications.show({
                        title: "Error",
                        message: error.message,
                        color: "red",
                      });
                    },
                  }
                );
              }}
            >
              {isPostLiked ? (
                <IconHeartFilled
                  className={"text-red-600"}
                  size="1.2rem"
                  stroke={1.5}
                />
              ) : (
                <IconHeart size="1.2rem" stroke={1.5} />
              )}
            </ActionIcon>

            <ActionIcon>
              <IconBookmark
                size="1.2rem"
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconShare
                size="1.2rem"
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
      <Group mt="xs">
        <Button
          component={Link}
          href={`/posts/post/${id}`}
          variant="outline"
          radius="md"
          style={{ flex: 1 }}
        >
          Show details
        </Button>
      </Group>
    </Card>
  );
}

export default PostsCard;
