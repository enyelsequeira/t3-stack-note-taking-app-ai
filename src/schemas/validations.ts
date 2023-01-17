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
