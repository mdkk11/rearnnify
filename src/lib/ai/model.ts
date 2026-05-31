import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

type AiProvider = "gateway" | "openai" | "google";

function getProvider(): AiProvider {
  const provider = process.env.AI_PROVIDER;

  if (provider === "openai" || provider === "google" || provider === "gateway") {
    return provider;
  }

  return "gateway";
}

export function getLanguageModel() {
  const provider = getProvider();
  const defaultModel =
    provider === "gateway"
      ? "openai/gpt-5.4"
      : provider === "google"
        ? "gemini-2.5-flash"
        : "gpt-5.4";
  const modelName = process.env.AI_MODEL ?? defaultModel;

  if (provider === "openai") {
    return openai(modelName.replace(/^openai\//, ""));
  }

  if (provider === "google") {
    return google(modelName.replace(/^google\//, ""));
  }

  return modelName;
}
