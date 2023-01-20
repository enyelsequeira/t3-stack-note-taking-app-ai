import { z } from "zod";

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
    .string()
    .optional()
    .transform((value) => value?.trim()),

  lastName: z
    .string()
    .optional()
    .transform((value) => value?.trim()),
  profileUrl: z
    .string()
    .url()
    .transform((value) => value?.trim())
    .optional(),
  username: z
    .string()
    .optional()
    .transform((value) => value?.trim()),
  // location should be ISO2 country code
  location: z
    .string()
    .optional()
    .refine((value) => /^[A-Z]{2}$/.test(value as string), {
      message: "Invalid ISO2 country code",
    }),
  bio: z.string().max(160).optional(),
  portfolio: z
    .string()
    .url()
    .optional()
    .transform((value) => value?.trim()),
});
// type
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
