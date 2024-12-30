/* eslint-env node */

import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY);

const seedProjects = async () => {
  const name = faker.lorem.words(2);
  console.log('Seeding db...');

  await supabase.from('projects').insert({
    name: faker.lorem.words(3),
    slug: name.toLowerCase().replace(/ /g, '-'),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: faker.helpers.arrayElements([1, 2, 3]),
  });
};

await seedProjects();
