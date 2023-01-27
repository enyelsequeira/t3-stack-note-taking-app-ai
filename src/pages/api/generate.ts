import type { ParsedEvent, ReconnectInterval } from "eventsource-parser";
import { createParser } from "eventsource-parser";
import type { NextRequest, NextResponse } from "next/server";

import { env } from "../../env/server.mjs";

// export const config = {
//   runtime: "edge",
// };

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
const handler = async (req: NextRequest, res: NextResponse) => {
  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt: req?.body.prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const testRes = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json({ testRes });

  // return new Response(stream);
};

export default handler;

const apiKey = env.OPENAPI_KEY;

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

  console.log({ res });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          console.log({ data });

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
        console.log({ object: chunk });
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  console.log({ stream });
  return stream;
}
