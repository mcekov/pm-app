<script setup lang="ts">
import { login } from '@/utils/supabaseAuth';
import { useFormErrors } from '@/composables/formErrors';

const router = useRouter();
const { serverError, handleServerError } = useFormErrors();

const formData = ref({
  email: '',
  password: '',
});

const signin = async () => {
  const { error } = await login(formData.value);
  if (!error) router.push('/');
  if (error) handleServerError(error);
};
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-2 border-red-500': serverError }"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-2 border-red-500': serverError }"
            />
          </div>

          <Button type="submit" class="w-full"> Login </Button>
        </form>

        <div
          v-if="serverError"
          class="w-full text-center my-4 py-3 lg:px-4 p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-sm flex lg:inline-flex"
          role="alert"
        >
          <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"
            >Error</span
          >
          <ul class="text-sm text-left text-white">
            <li v-if="serverError" class="">{{ serverError }}</li>
          </ul>
        </div>

        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
