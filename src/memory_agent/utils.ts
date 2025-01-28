import { BaseStore, LangGraphRunnableConfig } from "@langchain/langgraph";

import { initChatModel } from "langchain/chat_models/universal";

/**
 * Get the store from the configuration or throw an error.
 */
export function getStoreFromConfigOrThrow(
  config: LangGraphRunnableConfig,
): BaseStore {
  if (!config.store) {
    throw new Error("Store not found in configuration");
  }

  return config.store;
}

/**
 * Split the fully specified model name into model and provider.
 */
export function splitModelAndProvider(fullySpecifiedName: string): {
  model: string;
  provider?: string;
} {
  let provider: string | undefined;
  let model: string;

  if (fullySpecifiedName.includes("/")) {
    [provider, model] = fullySpecifiedName.split("/", 2);
  } else {
    model = fullySpecifiedName;
  }

  return { model, provider };
}

/**
 * Load a chat model from a fully specified name.
 * @param fullySpecifiedName - String in the format 'provider/model' or 'provider/account/provider/model'.
 * @returns A Promise that resolves to a BaseChatModel instance.
 */
export async function loadChatModel(fullySpecifiedName: string) {
  const index = fullySpecifiedName.indexOf("/");
  if (index === -1) {
    // If there's no "/", assume it's just the model
    return initChatModel(fullySpecifiedName);
  }
  const provider = fullySpecifiedName.slice(0, index);
  const model = fullySpecifiedName.slice(index + 1);
  return initChatModel(model, { modelProvider: provider });
}
