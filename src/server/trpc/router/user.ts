import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { UpdateUserSchema } from "./../../../schemas/validations";
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
        image,
      } = input.values;

      console.log(input.values, "🌞 cool image");

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
          ...(image && { image }),
        },
      });
      return user;
    }),
});
//  ImageListType,
// if (!uploadError) {
// const { data: updateData } = await supabase.storage
//   .from("profile-images")
//   .getPublicUrl(`${router.query.id}-profile`);
//   console.log({ updateData });
//   mutateUser.mutate(
//     {
//       id: id as string,
//       values: {
//         image: updateData.publicUrl,
//       },
//     },
//     {
//       onSuccess: (prev) => {
//         console.log({ prev });

//         // router.reload();
//         // dont do a hard refresh only mutate the user
//       },
//     }
//   );
// }
