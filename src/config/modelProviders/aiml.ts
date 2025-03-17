import { ModelProviderCard } from '@/types/llm';

// AI/ML Provider definition
const AIML: ModelProviderCard = {
  chatModels: [
    {
      contextWindowTokens: 128_000,
      description:
        'GPT-4o is OpenAI\'s most advanced model, blending intelligence and cost-effectiveness. It\'s available at a significantly reduced price through AI/ML, providing top-tier capabilities at improved rates.',
      displayName: 'GPT-4o',
      enabled: true,
      functionCall: true,
      id: 'openai/gpt-4o',
      pricing: {
        input: 1.5,
        output: 6,
      },
      vision: true,
    },
    {
      contextWindowTokens: 128_000,
      description:
        'GPT-4o mini offers 90% of GPT-4o\'s capabilities at a fraction of the cost. It\'s perfect for everyday use, providing excellent performance on a wide range of tasks.',
      displayName: 'GPT-4o mini',
      enabled: true,
      functionCall: true,
      id: 'openai/gpt-4o-mini',
      maxOutput: 16_385,
      pricing: {
        input: 0.1,
        output: 0.5,
      },
      vision: true,
    },
    {
      contextWindowTokens: 128_000,
      description:
        'GPT-3.5 Turbo is one of the most cost-effective AI models, perfect for routine tasks and conversational applications that don\'t require the full power of GPT-4.',
      displayName: 'GPT-3.5 Turbo',
      enabled: true,
      functionCall: true,
      id: 'openai/gpt-3.5-turbo',
      pricing: {
        input: 0.01,
        output: 0.03,
      },
    },
    {
      contextWindowTokens: 200_000,
      description:
        'Claude 3.5 Sonnet from Anthropic offers exceptional capabilities with faster speed than previous Claude versions. Ideal for programming, data science, and visual tasks.',
      displayName: 'Claude 3.5 Sonnet',
      enabled: true, 
      functionCall: true,
      id: 'anthropic/claude-3.5-sonnet',
      maxOutput: 8192,
      pricing: {
        input: 2.5,
        output: 12.5,
      },
      releasedAt: '2024-06-20',
      vision: true,
    },
    {
      contextWindowTokens: 163_840,
      description:
        'DeepSeek R1 is a powerful reasoning model, excelling at complex problem-solving, planning, and analytical tasks. It offers strong capabilities at a competitive price point.',
      displayName: 'DeepSeek R1',
      enabled: true,
      id: 'deepseek/deepseek-r1',
      pricing: {
        input: 2.5,
        output: 7.0,
      },
      releasedAt: '2025-01-20',
    },
    {
      contextWindowTokens: 32_768,
      description:
        'Llama 3.3 70B Instruct delivers GPT-4 level performance at a much lower price point. It excels at a wide range of tasks with excellent multilingual capabilities.',
      displayName: 'Llama 3.3 70B Instruct',
      enabled: true,
      functionCall: true,
      id: 'meta-llama/llama-3.3-70b-instruct',
      pricing: {
        input: 0.1,
        output: 0.25,
      },
    },
  ],
  checkModel: 'openai/gpt-3.5-turbo',
  description:
    'AI/ML API provides access to top-tier AI models with competitive pricing. The service offers a wide range of models from providers like OpenAI, Anthropic, Meta, and DeepSeek, allowing flexible model selection based on performance needs and budget considerations.',
  id: 'aiml',
  modelList: { showModelFetcher: true },
  name: 'AI/ML API',
  proxyUrl: {
    placeholder: 'https://api.aimlapi.com/v1',
  },
  settings: {
    // AI/ML works similarly to OpenRouter, so we'll use similar settings
    disableBrowserRequest: true,
    proxyUrl: {
      placeholder: 'https://api.aimlapi.com/v1',
    },
    sdkType: 'openai',
    searchMode: 'params',
    showModelFetcher: true,
  },
  url: 'https://aimlapi.com',
};

export default AIML; 