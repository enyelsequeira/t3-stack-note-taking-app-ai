import { UpdateUserSchema } from "./../../../schemas/validations";
import { router, publicProcedure } from "./../trpc";
import { z } from "zod";

export const user = router({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
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
});
