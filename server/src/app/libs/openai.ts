import OpenAI from "openai";
import { env } from "../../env";

export const openai = new OpenAI({
  apiKey: env.AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function generateEmbeddings(text: string): Promise<number[]> {
  const input = text.replace(/\s+/g, " ").trim();
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });
  return res.data[0].embedding as unknown as number[];
}

export async function chatCompletion(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
  });
  return res.choices[0]?.message?.content || "";
}
