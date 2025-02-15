import type { LoginForm, RegisterForm } from '@/types/AuthForm';
import type { AuthError } from '@supabase/supabase-js';

type FormErrors<Type> = {
  [Property in keyof Type]: string[];
};

export const useFormErrors = () => {
  const serverError = ref('');
  const realtimeErrors = ref<FormErrors<LoginForm | RegisterForm>>();

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
