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
});
