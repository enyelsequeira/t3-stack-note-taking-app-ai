import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const postComment = router({
  // using prisma we should be able to post a comment
  // and return the comment
  postAcomment: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { postId, content } = input;
      if (!ctx.session?.user) {
        throw new Error("You must be logged in to post a comment");
      }
      const comment = await ctx.prisma.comment.create({
        data: {
          text: content,

          // we need to find the post that we are commenting on
          post: {
            connect: {
              id: postId,
            },
          },

          // we need to find the user that is posting the comment
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      console.log({ comment });
      return comment;
    }),

  // get all comments
  getAll: publicProcedure.query(async ({ ctx }) => {
    const comments = await ctx.prisma.comment.findMany();
    return comments;
  }),
});
