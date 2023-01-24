import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { CreateUser, UpdateUserSchema } from "./../../../schemas/validations";
import { router, publicProcedure } from "./../trpc";
import { z } from "zod";

export const user = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const { password, ...rest } = user;
      return rest;
    }),
  updateById: publicProcedure
    .input(
      z.object({
        values: UpdateUserSchema,
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        username,
        firstName,
        lastName,
        profileUrl,
        location,
        bio,
        portfolio,
      } = input.values;

      const user = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...(username && { username }),
          ...(bio && { bio }),

          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(portfolio && { portfolio }),

          ...(profileUrl && { profileUrl }),

          ...(location && { location }),
        },
      });
      return user;
    }),

  // creates a user and sets up in the database
  create: publicProcedure.input(CreateUser).mutation(async ({ ctx, input }) => {
    const { username, email, password } = input;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    // check if username or email already exists
    const userExists = await ctx.prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (userExists) {
      throw new TRPCError({
        message: "Username or email already exists",
        code: "BAD_REQUEST",
      });
    }

    const user = await ctx.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log({ user });

    return user;
  }),
});
