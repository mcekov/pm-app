import { groupedProfilesQuery } from '@/utils/supabaseQueries';

export const useCollaborators = () => {
  const getProfilesById = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) return [];

    return data;
  };

  return { getProfilesById };
};
