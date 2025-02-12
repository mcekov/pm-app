import { supabase } from '@/lib/supabaseClient';
import { profileQuery } from '@/utils/supabaseQueries';
import type { Session, User } from '@supabase/supabase-js';
import type { Tables } from 'database/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | User>(null);
  const profile = ref<null | Tables<'profiles'>>(null);

  const setProfile = async () => {
    if (!user.value) {
      return (profile.value = null);
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id);

      profile.value = data ?? null;
    }
  };

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null;
      profile.value = null;
      return;
    }

    user.value = userSession?.user ?? null;
    await setProfile();
  };

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      await setAuth(data.session);
    }
  };

  return { user, profile, setAuth, getSession };
});
