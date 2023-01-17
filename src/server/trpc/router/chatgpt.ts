import { env } from "../../../env/server.mjs";
import { publicProcedure, router } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { ChatGPTFormSchema } from "../../../schemas/validations";

const apiKey = env.OPENAPI_KEY;
const organization = "org-MiSSdn3E5e4M85tYLBVoZg4B  ";

const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

export const chatGPT = router({
  askQuestion: publicProcedure
    .input(ChatGPTFormSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: input.input,
          max_tokens: 2048,
          temperature: 0.9,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"],
        });
        console.log({ RESPONSE: response.data.choices });
        console.log({
          RESPONSE: response.data.choices.map((c) => console.log({ re: c })),
        });
        return response?.data?.choices[0]?.text;
      } catch (error) {
        return `Error with the fetch of completiond code: ${error}`;
      }
    }),
});
//
// chat: publicProcedure
//     .input(z.object({ input: z.string() }))
//     .mutation(async ({ input }) => {
//         console.log({ MYCOOLINPUT: input.input });
//         const response = await fetch(endpoint, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify({
//                 prompt: input.input,
//                 max_tokens: 100,
//             }),
//         });
//         console.log({ RESPONSE: response });
//         const data = await response.json();
//         console.log({ BIGDATAAAAAA: data });
//         console.log({ BIGDATAAAAAA: data.choices });
//         console.log({ DATA: data.choices[0].text });
//         return data;
//     }),
