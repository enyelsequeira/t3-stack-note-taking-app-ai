import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { CreateNote, UpdateNote } from "../../../schemas/validations";
import { TRPCError } from "@trpc/server";

export const post = router({
  // get all posts
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        keywords: true,
        description: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        likes: true,
        userId: true,

        user: {
          select: {
            name: true,
            id: true,
            username: true,
          },
        },
      },
    });
    return posts;
  }),

  // create a post, however we need to be logged in and only if the user email is enyelsequeira@hotmail.com
  createNote: publicProcedure
    .input(CreateNote)
    .mutation(async ({ ctx, input }) => {
      const { title, text, keywords, description } = input;
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a post",
          cause: new Error("You must be logged in to create a post"),
        });
      }

      const newPost = await ctx.prisma.post.create({
        data: {
          text,
          title,
          keywords,
          description,

          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return newPost;
    }),
  // get post/Note by their userId
  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    if (!session?.user)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to see posts",
        cause: new Error("You must be logged in to see posts"),
      });
    const posts = await ctx.prisma.post.findMany({
      where: {
        userId: session?.user?.id,
      },
    });
    return posts;
  }),

  // get by post id
  getByPostId: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { postId } = input;
      const post = await ctx.prisma.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
      });
      return post;
    }),
  // update a post by id, it must belong to the user
  updatePost: protectedProcedure
    .input(UpdateNote)
    .mutation(async ({ ctx, input }) => {
      const { postId, title, text, keywords, userId, description } = input;
      // we have to do a few things, here check the if the post belongs to the userId, if it does we can update it, however if it doesn't we throw an error saying that the post doesn't belong to the user
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Opps, seems like this post doesn't exist",
          cause: new Error("Post not found"),
        });
      }
      if (post.userId !== userId) {
        console.log({ THEYDONOTMATCH: post?.userId, userId });
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Opps, seems like you are not the owner of this post",
          cause: new Error("Wrong user"),
        });
      }

      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title,
          text,
          keywords,
          description,
        },
      });
      return updatedPost;
    }),

  // like a post based on the id
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, userId } = input;
      // we have to do a few things, here check the if the post belongs to the userId, if it does we can update it, however if it doesn't we throw an error saying that the post doesn't belong to the user
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Opps, seems like this post doesn't exist",
          cause: new Error("Post not found"),
        });
      }
      if (post.userId === userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Opps, seems like you are the owner of this post",
          cause: new Error("Wrong user"),
        });
      }

      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return updatedPost;
    }),

  toggleLikePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, userId } = input;

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Opps, seems like this post doesn't exist",
          cause: new Error("Post not found"),
        });
      }
      if (post.userId === userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Oops, you cannot like your own post",
          cause: new Error("Liking own post"),
        });
      }

      const postIsLiked = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likes: {
            where: {
              id: userId,
            },
          },
        },
      });

      // actual toggle is happening here, if the post is liked by the user, we disconnect it, if it is not liked by the user, we connect it
      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: postIsLiked?.likes.length
            ? {
                disconnect: {
                  id: userId,
                },
              }
            : {
                connect: {
                  id: userId,
                },
              },
        },
      });

      return updatedPost;
    }),

  getLikedPosts: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Opps, seems like you are not logged in",
      });
    }

    const posts = await ctx.prisma.post.findMany({
      where: {
        likes: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
    return posts;
  }),
  // we need to get who like the post and we need to get their username/name
  getPeopleWhoLikedPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { postId } = input;
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likes: {
            include: {
              likes: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
      return post?.likes;
    }),
});
