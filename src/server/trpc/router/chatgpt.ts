import { env } from "../../../env/server.mjs";
import { publicProcedure, router } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { ChatGPTFormSchema } from "../../../schemas/validations";
import type { ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { createParser } from "eventsource-parser";
const apiKey = env.OPENAPI_KEY;
const organization = env.OPENAPI_ORGANIZATION;

const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// testing new features

export interface OpenAIStreamPayload {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

async function OpenAIStream(payload: OpenAIStreamPayload) {
  const enconder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE}") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = enconder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(error);
          }
        }
      }

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return;
}

export const chatGPT = router({
  askQuestion: publicProcedure
    .input(ChatGPTFormSchema)
    .mutation(async ({ input }) => {
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: input.input,
          max_tokens: 2048,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: [" Human:", " AI:"],
          n: 1,
        });
        console.log({ RESPONSE: response.data.choices });
        console.log({
          RESPONSE: response.data.choices.map((c) => console.log({ re: c })),
        });
        // from here we get a response "\n\nI can assist you with many tasks. What do you need help with?" we need to remove the \n\m
        // return response?.data?.choices[0]?.text?.split("\n\n");
        const responseText = response?.data?.choices[0]?.text;
        const responseTextArray = responseText?.split("\n\n");
        const responseTextArrayFiltered = responseTextArray?.filter(
          (item) => item !== ""
        );
        const responseTextArrayFilteredJoined =
          responseTextArrayFiltered?.join("\n\n");
        return responseTextArrayFilteredJoined;
      } catch (error) {
        return `Error with the fetch of completiond code: ${error}`;
      }
    }),
});
