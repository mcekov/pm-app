import type { GroupedCollabs } from '@/types/GroupedCollabs';
import {
  groupedProfilesQuery,
  type Projects,
  type TasksWithProjects,
} from '@/utils/supabaseQueries';

export const useCollaborators = () => {
  const groupedCollabs = ref<GroupedCollabs>({});

  const getProfilesById = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) return [];

    return data;
  };

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length);
    const promises = filteredItems.map((item) => getProfilesById(item.collaborators));

    const results = await Promise.all(promises);

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index];
    });
  };

  return { getProfilesById, groupedCollabs, getGroupedCollabs };
};
