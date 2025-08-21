import mongoose from "mongoose";
import { SyllabusChunksModel } from "../models/syllabus.model";

// Simple cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * (b[i] || 0), 0);
  const normA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const normB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  if (normA === 0 || normB === 0) return 0;
  return dot / (normA * normB);
}

export async function searchSyllabusChunks(
  userId: mongoose.Types.ObjectId,
  conversationId: mongoose.Types.ObjectId,
  queryEmbedding: number[],
  k: number = 5,
) {
  const chunks = await SyllabusChunksModel.find({
    userId,
    conversation: conversationId,
  }).lean();

  const ranked = chunks
    .map((c) => ({
      ...c,
      score: cosineSimilarity(queryEmbedding, c.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  return ranked;
}
