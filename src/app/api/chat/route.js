import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();
  const apiKey = req.headers.get("x-openai-key");

  const openai = new OpenAI({
    apiKey: apiKey ? apiKey : null,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: `Please convert the given text into a professional cover letter format. You should not add anything on your own to the response. The response should be in a professional tone and same context as the text given to you. In Response Maximum characters 100.${messages}`,
      },
    ],
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
