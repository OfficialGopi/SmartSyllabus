import mongoose from "mongoose";
import { chatCompletion, generateEmbeddings } from "../libs/openai";
import { searchSyllabusChunks } from "../libs/vectorstore";

export async function createEmbedding(text: string): Promise<number[]> {
  return generateEmbeddings(text);
}

export async function retrieveContext(
  query: string,
  userId: mongoose.Types.ObjectId,
  conversationId: mongoose.Types.ObjectId,
): Promise<{ context: string; usedIds: mongoose.Types.ObjectId[] }> {
  const embedding = await generateEmbeddings(query);
  const results = await searchSyllabusChunks(
    userId,
    conversationId,
    embedding,
    6,
  );
  const context = results.map((r) => r.chunk).join("\n\n");
  const usedIds = results.map((r) => r._id as mongoose.Types.ObjectId);
  return { context, usedIds };
}

export async function generateRoadmapFromAI(
  query: string,
  context: string,
): Promise<string> {
  const system =
    "You are SmartSyllabus AI. Generate a structured daily study roadmap with goals, and 2-3 resources per day (YouTube and PDFs). Keep it concise and actionable.";
  const prompt = `User query: ${query}\n\nRelevant syllabus context:\n${context}\n\nReturn a markdown plan with days, goals, and bullet resources.`;
  return chatCompletion(system, prompt);
}
