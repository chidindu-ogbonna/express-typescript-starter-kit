import { tool } from "@langchain/core/tools";
import { LangGraphRunnableConfig } from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { ensureConfiguration } from "./configuration.js";
import { getStoreFromConfigOrThrow } from "./utils.js";

import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";







const duckDuckGoSearchTool = new DuckDuckGoSearch({ maxResults: 1 });



export const TOOLS = [duckDuckGoSearchTool];