<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient, type BetterAuthSessionData } from '~/lib/auth-client';
import {
  signInSchema,
  type SignInSchema
} from '~~/shared/zod-schemas/sign-in.zod';

const { isLastUsed } = defineProps<{
  isLastUsed?: boolean;
}>();

const emit = defineEmits<{
  signIn: [payload: BetterAuthSessionData];
}>();

const toast = useToast();

const state = ref<Partial<SignInSchema>>({
  rememberMe: true
});

const reset = () => {
  state.value = {
    rememberMe: true
  };
};

async function handleSubmit(event: FormSubmitEvent<SignInSchema>) {
  const { email, password, rememberMe } = event.data;

  const encodedEmail = btoa(email);

  const payload = {
    email: email.trim(),
    password,
    rememberMe
  };

  await authClient.signIn.email(payload, {
    onSuccess: async () => {
      reset();

      toast.add({
        title: 'Success',
        description: 'Sign in successful',
        color: 'success'
      });

      try {
        const { data, error } = await authClient.getSession();
        if (error || !data) {
          throw new Error('Failed to complete registration. Try again later.');
        }

        // Handle unverified emails
        if (!data.user.emailVerified) {
          await navigateTo({
            name: 'verify-email',
            query: { email: encodedEmail }
          });
          return;
        }

        // emit
        emit('signIn', data);
      } catch (error) {
        toast.add({
          title: 'Sign In Error',
          description: normalizeException(error).message,
          color: 'error'
        });
      }
    },
    onError: (ctx) => {
      toast.add({
        title: 'Sign In Error',
        description: ctx.error.message,
        color: 'error'
      });
    }
  });
}
</script>

<template>
  <NuxtForm :state="state" :schema="signInSchema" @submit="handleSubmit">
    <div class="grid md:grid-cols-2 gap-4">
      <NuxtFormField
        name="email"
        label="Email Address"
        required
        class="md:col-span-2"
      >
        <NuxtInput
          v-model="state.email"
          placeholder="Email address"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtFormField
        name="password"
        label="Password"
        required
        class="md:col-span-2"
      >
        <NuxtPassword
          v-model="state.password"
          placeholder="Password"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <div class="md:col-span-2 flex items-center justify-between">
        <NuxtFormField name="rememberMe">
          <NuxtCheckbox v-model="state.rememberMe" label="Remember me" />
        </NuxtFormField>

        <NuxtLink to="/forgot-password" class="link text-sm">
          Forgot password?
        </NuxtLink>
      </div>

      <div class="relative md:col-span-2">
        <NuxtButton type="submit" block size="lg" loading-auto>
          Sign In
        </NuxtButton>

        <NuxtBadge
          v-if="isLastUsed"
          color="secondary"
          class="absolute -top-2 -right-2"
        >
          Last used
        </NuxtBadge>
      </div>
    </div>
  </NuxtForm>
</template>
