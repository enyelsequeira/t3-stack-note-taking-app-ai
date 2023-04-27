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
import { Post } from "@prisma/client";
import { IconBookmark, IconHash, IconHeart, IconShare } from "@tabler/icons";
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

function PostsCard({ id, title, keywords }: Post) {
  const { classes, theme } = useStyles();
  const features = keywords.map((keyword, i) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={i}
      leftSection={<IconHash size={12} />}
    >
      {keyword}
    </Badge>
  ));

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
            {title}
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
        <Text fz="sm" mt="xs">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
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
            THEY LIKED 888
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart
                size="1.2rem"
                color={theme.colors.red[6]}
                stroke={1.5}
              />
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
