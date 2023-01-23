import { z } from "zod";
import { getCode } from "country-list";

export const ChatGPTFormSchema = z.object({
  input: z.string(),
});

export const CreateNote = z.object({
  title: z.string(),
  content: z.string(),
  // keywords: z.array(z.string()),
  keywords: z.string(),
});

// so we will create a schema for the user, now a few things to keep in mind, none of these are required in zod, user
// will be able to update one field or all of them at once, so we will make all of them optional

export const UpdateUserSchema = z.object({
  firstName: z
    .union([
      z.literal(""),
      z
        .string()
        .max(50, {
          message: "First name is too long",
        })
        .min(2, {
          message: "First name is too short",
        }),
    ])
    .optional()
    .transform((value) => value?.trim()),

  lastName: z
    .union([
      z.literal(""),
      z
        .string()
        .max(50, {
          message: "Last name is too long",
        })
        .min(2, {
          message: "Last name is too short",
        }),
    ])
    .optional()
    .transform((value) => value?.trim()),
  profileUrl: z.union([z.literal(""), z.string().url()]).optional(),

  username: z
    .union([
      z.literal(""),
      z
        .string()
        .max(50, {
          message: "Username is too long",
        })
        .min(2, {
          message: "Username is too short",
        }),
    ])
    .optional()
    .transform((value) => value?.trim()),
  // location should be ISO2 country code
  location: z
    .union([
      z.literal(""),
      z
        .string()
        .max(100, {
          message: "Location is too long",
        })
        .transform((value) => {
          if (value) {
            const code = getCode(value);
            if (code) {
              return code;
            }
          }
          return value;
        }),
    ])
    .optional(),
  bio: z
    .union([
      z.literal(""),
      z
        .string()
        .max(300, {
          message: "Bio is too long",
        })
        .min(2, { message: "Bio is too short" }),
    ])
    .optional()
    .transform((value) => value?.trim()),
  portfolio: z.union([z.literal(""), z.string().url()]).optional(),
});
// type
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
