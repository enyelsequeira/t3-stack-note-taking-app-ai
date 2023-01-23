![1 Memominder](https://cdn.discordapp.com/attachments/990816772108202044/1067067966107156500/Enyel_create_a_logo_about_taking_notes_and_reminder_the_company_db4cdb56-da59-43b5-95e6-0866f2516aa8.png)

[Memominder](https://github.com/enyelsequeira/t3-stack-note-taking-app-ai) is an open-source project that allows users to take notes using AI tools such as ChatGPT.

Amplication auto-generates backend apps built with TypeScript and Node.js, and a client built with React.

# Features

Memomider provides the following features:

- Take notes with natural language input
- Use ChatGPT to generate summaries of notes
- Organize notes by category or tags
- Search for notes by keywords
- Share notes with others

### Built with TRPC

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join the [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Getting Started With Local Development

Follow these simple instructions to set up a local development environment.

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/enyelsequeira/t3-stack-note-taking-app-ai
pnpm  install
```

```bash
// set up env vars
DATABASE_URL=
SHADOW_DATABASE_URL=
#AUTH
NEXTAUTH_SECRET=
NEXTAUTH_URL=
# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
# Githb
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# Open APi
OPENAPI_KEY=
OPENAPI_ORGANIZATION=

```

```bash
pnpm run dev
```

### Please follow the commit guidelines, this repo uses

- [Husky](https://typicode.github.io/husky/#/)
  - run `pnpm prepare`
- [commitlint](https://github.com/conventional-changelog/commitlint)
