import { appEnv } from '@/config/app';

export type ErrorType = Error & { digest?: string };

export const sentryCaptureException = async (error: Error & { digest?: string }) => {
  // Simple error logging now that Sentry is removed
  console.error('[Error]', error);
  return error;
};
