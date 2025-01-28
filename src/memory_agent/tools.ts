import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

const duckDuckGoSearchTool = new DuckDuckGoSearch({ maxResults: 1 });

export const TOOLS = [duckDuckGoSearchTool];
