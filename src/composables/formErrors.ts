import type { AuthError } from '@supabase/supabase-js';

export const useFormErrors = () => {
  const serverError = ref('');

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message;
  };

  return { serverError, handleServerError } as const;
};
