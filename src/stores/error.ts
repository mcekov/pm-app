import { defineStore } from 'pinia';
import type { CustomError } from '@/types/Error';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null);

  const setError = ({ err, customCode }: { err: string; customCode: number }) => {
    activeError.value = Error(err);
    activeError.value.customCode = customCode;
  };

  return {
    activeError,
    setError,
  };
});
