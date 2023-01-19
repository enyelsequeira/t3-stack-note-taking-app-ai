import { user } from "./user";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { post } from "./post";
import { chatGPT } from "./chatgpt";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  post: post,
  GPT: chatGPT,
  user,
  // comment: postComment,
});

// export type definition of API
export type AppRouter = typeof appRouter;
