import { ModelProvider } from '@/libs/agent-runtime';
import { genUserLLMConfig } from '@/utils/genUserLLMConfig';

export const DEFAULT_LLM_CONFIG = genUserLLMConfig({
  aiml: {
    enabled: true,
  },
  lmstudio: {
    fetchOnClient: true,
  },
  ollama: {
    enabled: true,
    fetchOnClient: true,
  },
  openai: {
    enabled: true,
  },
  openrouter: {
    enabled: true,
  },
});

export const DEFAULT_MODEL = 'gpt-4o';

export const DEFAULT_EMBEDDING_MODEL = 'nomic-ai/nomic-embed-text-v1.5:free';
export const DEFAULT_EMBEDDING_PROVIDER = ModelProvider.OpenRouter;

export const DEFAULT_RERANK_MODEL = 'rerank-english-v3.0';
export const DEFAULT_RERANK_PROVIDER = 'cohere';
export const DEFAULT_RERANK_QUERY_MODE = 'full_text';

export const DEFAULT_PROVIDER = ModelProvider.AIML;
