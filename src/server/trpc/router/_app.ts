import { user } from "./user";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { post } from "./post";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  post: post,
  user,
  // comment: postComment,
});

// export type definition of API
export type AppRouter = typeof appRouter;
