import { z } from "zod";
import { publicProcedure, router } from "../trpc";
export const post = router({
  // get all posts
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();
    return posts;
  }),
  // get a post by id
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const post = await ctx.prisma.post.findUnique({
        where: {
          id,
        },
      });

      return post;
    }),
  // we now have to create a comment for a post and we need to be logged in to do that
  //get post comments
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { postId } = input;
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId,
        },
      });
      return comments;
    }),
  // create a comment for a post
  createComment: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, content } = input;
      if (!ctx.session?.user) {
        throw new Error("You must be logged in to create a comment");
      }
      const comment = await ctx.prisma.comment.create({
        data: {
          text: content,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
      return comment;
    }),

  // create a post, however we need to be logged in and only if the user email is enyelsequeira@hotmail.com
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        // keywords: z.array(z.string()),
        keywords: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, keywords } = input;
      if (!ctx.session?.user) {
        throw new Error("You must be logged in to create a post");
      }
      if (ctx.session.user.email !== "enyelsequeira@hotmail.com") {
        throw new Error("You must be an admin to in to create a post");
      }
      const post = await ctx.prisma.post.create({
        data: {
          title: title,
          keywords,
          text: content,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return post;
    }),
});
