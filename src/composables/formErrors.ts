import type { LoginForm } from '@/types/AuthForm';
import type { AuthError } from '@supabase/supabase-js';

export const useFormErrors = () => {
  const serverError = ref('');
  const realtimeErrors = ref();

  const handleServerError = (error: AuthError) => {
    serverError.value = error.message;
  };

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    };

    const { validateEmail, validatePassword } = await import('@/utils/formValidation');

    const emailErrors = validateEmail(formData.email);
    const passwordErrors = validatePassword(formData.password);

    if (emailErrors.length) {
      realtimeErrors.value.email = emailErrors;
    }

    if (passwordErrors.length) {
      realtimeErrors.value.password = passwordErrors;
    }
  };

  return { serverError, handleServerError, realtimeErrors, handleLoginForm } as const;
};
