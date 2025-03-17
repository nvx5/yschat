import { AiFullModelCard, ModelAbilities } from '@/types/aiModel';

const aiml: AiFullModelCard[] = [
  // OpenAI models
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 128_000,
    description:
      'GPT-4o is OpenAI\'s most advanced model, blending intelligence and cost-effectiveness. It\'s available at a significantly reduced price through AI/ML, providing top-tier capabilities at improved rates.',
    displayName: 'GPT-4o',
    enabled: true,
    id: 'gpt-4o',
    pricing: {
      input: 1.5,
      output: 6,
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 128_000,
    description:
      'GPT-4o mini offers 90% of GPT-4o\'s capabilities at a fraction of the cost. It\'s perfect for everyday use, providing excellent performance on a wide range of tasks.',
    displayName: 'GPT-4o mini',
    enabled: true,
    id: 'gpt-4o-mini',
    pricing: {
      input: 0.1,
      output: 0.5,
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 16_000,
    description:
      'GPT-3.5 Turbo is one of the most cost-effective AI models, perfect for routine tasks and conversational applications that don\'t require the full power of GPT-4.',
    displayName: 'GPT-3.5 Turbo',
    enabled: true,
    id: 'gpt-3.5-turbo',
    pricing: {
      input: 0.01,
      output: 0.03,
    },
    type: 'chat',
  },
  // Anthropic models
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 200_000,
    description:
      'Claude 3.5 Sonnet from Anthropic offers exceptional capabilities with faster speed than previous Claude versions. Ideal for programming, data science, and visual tasks.',
    displayName: 'Claude 3.5 Sonnet',
    enabled: true,
    id: 'anthropic/claude-3-5-sonnet',
    pricing: {
      input: 2.5,
      output: 12.5,
    },
    releasedAt: '2024-06-20',
    type: 'chat',
  },
  // Mistral models
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 32_000,
    description:
      'Mistral 7B Instruct v0.2 offers strong performance for general text generation, reasoning, and conversation at a very affordable price point.',
    displayName: 'Mistral 7B Instruct',
    enabled: true,
    id: 'mistralai/Mistral-7B-Instruct-v0.2',
    pricing: {
      input: 0.05,
      output: 0.15,
    },
    type: 'chat',
  },
  // DeepSeek models
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
    type: 'chat',
  },
  // Meta models
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 128_000,
    description:
      'Llama 3.1 70B Instruct Turbo delivers exceptional performance at a lower price point. It excels at a wide range of tasks with excellent multilingual capabilities.',
    displayName: 'Llama 3.1 70B Instruct',
    enabled: true,
    id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    pricing: {
      input: 0.1,
      output: 0.25,
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 8_000,
    description:
      'Llama 3 8B Instruct is a compact but capable model, perfect for deployments where size and speed matter but good performance is still required.',
    displayName: 'Llama 3 8B Instruct',
    enabled: true,
    id: 'meta-llama/Llama-3-8b-chat-hf',
    pricing: {
      input: 0.05,
      output: 0.1,
    },
    type: 'chat',
  },
  // Google models
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 8_000,
    description:
      'Gemma 2 27B Instruct from Google provides reliable performance with balanced capabilities across a variety of tasks at a favorable price point.',
    displayName: 'Gemma 2 27B Instruct',
    enabled: true,
    id: 'google/gemma-2-27b-it',
    pricing: {
      input: 0.07,
      output: 0.14,
    },
    type: 'chat',
  },
];

export default aiml; 