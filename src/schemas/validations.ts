import { z } from "zod";
import { getCode } from "country-list";

export const ChatGPTFormSchema = z.object({
  input: z.string(),
});

export type ChatGPTForm = z.infer<typeof ChatGPTFormSchema>;
export const CreateNote = z.object({
  title: z
    .string({
      description: "Title of the note",
      required_error: "Title is required",
    })
    .min(2, { message: "Title is too short" })
    .max(100, { message: "Title is too long" }),
  text: z.string(),
  // keywords should be a string array of at least 3 items
  keywords: z.array(z.string()).min(3, {
    message: "Please add at least 3 tags",
  }),

  // keywords: z.string(),
});
export type NoteCreation = z.infer<typeof CreateNote>;

// lets use the createNote schema to extend one more values userId
export const UpdateNote = CreateNote.extend({
  userId: z.string(),
  postId: z.string(),
});
export type UpdateNoteType = z.infer<typeof UpdateNote>;

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
  // image
  image: z.union([z.literal(""), z.string().url()]).optional(),
});
// type
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export const CreateUser = z.object({
  // username: z
  //   .string()
  //   .max(50, {
  //     message: "Username is too long",
  //   })
  //   .min(2, {
  //     message: "Username is too short",
  //   })
  //   .transform((value) => value?.trim()),
  email: z.string().email(),
  // password: z
  //   .string()
  //   .min(6, {
  //     message: "Password must be at least 6 characters",
  //   })
  //   .max(16, {
  //     message: "Password must be at most 16 characters",
  //   })
  //   .refine(
  //     (value) => {
  //       return /[a-zA-Z]/.test(value);
  //     },
  //     {
  //       message: "Password must contain at least one letter",
  //     }
  //   )
  //   .refine(
  //     (value) => {
  //       return /[0-9]/.test(value);
  //     },
  //     {
  //       message: "Password must contain at least one number",
  //     }
  //   )
  //   .refine(
  //     (value) => {
  //       return /[!@$^?&*]/.test(value);
  //     },
  //     {
  //       message: "Password must contain at least one special character",
  //     }
  //   ),
  // repeatPassword: z.string(),
});
// .superRefine(({ repeatPassword, password }, ctx) => {
//   if (repeatPassword !== password) {
//     // we need to add the error to the repeatPassword field
//     ctx.addIssue({
//       code: "custom",
//       path: ["repeatPassword"],
//       message: "Passwords do not match",
//     });
//   }
// });

export type CreateUserType = z.infer<typeof CreateUser>;

// sign in schema
export const SignInUser = z.object({
  email: z.string().email({
    message: "Email is not valid",
  }),
  // password: z.string().min(6, {
  //   message: "Password must be at least 6 characters",
  // }),
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters",
  // }),
});

export type SignInUserType = z.infer<typeof SignInUser>;
