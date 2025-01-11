import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<boolean>(false);

  const setError = (message: string) => {
    activeError.value = true;
  };

  const clearError = () => {
    activeError.value = false;
  };

  return {
    activeError,
    setError,
    clearError,
  };
});
