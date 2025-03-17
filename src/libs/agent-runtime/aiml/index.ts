import { ChatModelCard } from '@/types/llm';

import { AgentRuntimeErrorType } from '../error';
import { ModelProvider } from '../types';
import { LobeOpenAICompatibleFactory } from '../utils/openaiCompatibleFactory';

// Create the AIML implementation using the OpenAI compatible factory
export const LobeAimlAI = LobeOpenAICompatibleFactory({
  baseURL: 'https://api.aimlapi.com/v1',
  chatCompletion: {
    handlePayload: (payload) => {
      // Add console logging for debugging
      console.log('AIML API Request Payload:', {
        model: payload.model,
        messages: payload.messages,
      });
      
      // For non-OpenAI models, we might need to map to the correct model ID format
      let modelId = payload.model;
      
      // Strip the path part for basic analysis (e.g., "gpt-4o-mini" from "openai/gpt-4o-mini") if present
      let baseModelId = modelId;
      if (modelId.includes('/')) {
        baseModelId = modelId.split('/').pop() || modelId;
      }
      
      // Map specific models if needed based on the API requirements
      // The modelMap helps normalize model IDs that might have variations
      const modelMap: Record<string, string> = {
        // Claude models require the anthropic/ prefix
        'claude-3-5-sonnet': 'anthropic/claude-3-5-sonnet',
        'claude-3.5-sonnet': 'anthropic/claude-3-5-sonnet', // Handle both formats
        
        // DeepSeek models require the deepseek/ prefix
        'deepseek-r1': 'deepseek/deepseek-r1',
        
        // Llama models 
        'llama-3-70b-instruct': 'meta-llama/Llama-3-70b-chat-hf',
        'llama-3.1-70b-instruct': 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        'llama-3-8b-instruct': 'meta-llama/Llama-3-8b-chat-hf',
        
        // Mistral models
        'mistral-7b-instruct': 'mistralai/Mistral-7B-Instruct-v0.2',
        
        // Google models
        'gemma-2-27b-instruct': 'google/gemma-2-27b-it',
      };
      
      // Determine if we need to use a vendor-specific prefix
      // Some models require full paths with vendor prefixes in the AIML API
      const requiresPrefix = (id: string): boolean => {
        const lowerId = id.toLowerCase();
        return (
          lowerId.includes('mistral') || 
          lowerId.includes('llama') || 
          lowerId.includes('gemma') || 
          lowerId.includes('claude') ||
          lowerId.includes('deepseek') ||
          lowerId.startsWith('meta-') ||
          lowerId.startsWith('google/') ||
          lowerId.startsWith('anthropic/') ||
          lowerId.startsWith('deepseek/')
        );
      };
      
      // Handle model mappings
      let mappedModel = modelMap[baseModelId] || modelId;
      
      // Always ensure Claude models have the anthropic/ prefix
      if (baseModelId.includes('claude') && !mappedModel.startsWith('anthropic/')) {
        mappedModel = `anthropic/${baseModelId}`;
      }
      
      // Always ensure DeepSeek models have the deepseek/ prefix
      if (baseModelId.includes('deepseek') && !mappedModel.startsWith('deepseek/')) {
        mappedModel = `deepseek/${baseModelId.replace('deepseek-', 'deepseek-')}`;
      }
      
      // Check if the model already has a vendor prefix, if not and it requires one, use the mapped model
      if (!mappedModel.includes('/') && requiresPrefix(baseModelId.toLowerCase())) {
        console.log(`AIML API: Model "${baseModelId}" requires a vendor prefix but doesn't have one`);
        // This means we should try to find a mapping for this model
        if (modelMap[baseModelId]) {
          mappedModel = modelMap[baseModelId];
        } else {
          console.warn(`AIML API: No vendor prefix mapping found for model "${baseModelId}"`);
        }
      }
      
      console.log(`AIML API: Mapping model "${payload.model}" to "${mappedModel}"`);
      
      return {
        ...payload,
        model: mappedModel,
        stream: payload.stream ?? true,
      } as any;
    },
    // Add logging for error debugging
    handleError: (error) => {
      console.error('AIML API Error:', error);
      
      // Extract useful error information if available
      const errorDetails = {
        status: error?.status,
        message: error?.message,
        type: error?.type,
        data: error?.data,
      };
      
      console.log('AIML error details:', errorDetails);
      
      // Check for specific error types and return appropriate error payload
      if (error?.status === 401) {
        return { errorType: AgentRuntimeErrorType.AimlInvalidAPIKey, error };
      }
      // Add more specific error handling based on error status
      if (error?.status === 404) {
        console.error('Model not found. Check if the model ID is correct in the configuration');
      }
      
      return { errorType: AgentRuntimeErrorType.AimlBizError, error };
    },
  },
  constructorOptions: {
    defaultHeaders: {
      'HTTP-Referer': 'https://chat-preview.lobehub.com',
      'X-Title': 'Lobe Chat',
      'Content-Type': 'application/json',
    },
  },
  debug: {
    chatCompletion: () => true, // Enable debug logging for all requests
  },
  errorType: {
    bizError: AgentRuntimeErrorType.AimlBizError,
    invalidAPIKey: AgentRuntimeErrorType.AimlInvalidAPIKey,
  },
  provider: ModelProvider.AIML,
}); 