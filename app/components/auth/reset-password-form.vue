<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';
import {
  resetPasswordSchema,
  type ResetPasswordSchema
} from '~~/shared/zod-schemas/password.zod';

const token = useRouteData().getSearchParams('token');
const toast = useToast();

const state = ref<Partial<ResetPasswordSchema>>({});

function reset() {
  state.value = {};
}

const open = ref<boolean>(false);

async function onSubmit(event: FormSubmitEvent<ResetPasswordSchema>) {
  if (!token) {
    toast.add({
      title: 'Error',
      description: 'Invalid or expired token. Try again later.',
      color: 'error'
    });
    return;
  }
  const { password } = event.data;

  await authClient.resetPassword(
    {
      newPassword: password,
      token
    },
    {
      onError(ctx) {
        toast.add({
          title: 'Error',
          description: ctx.error.message,
          color: 'error'
        });
      },
      onSuccess() {
        reset();
        open.value = true;
      }
    }
  );
}
</script>

<template>
  <div>
    <NuxtForm
      :schema="resetPasswordSchema"
      :state="state"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <NuxtFormField label="New Password" name="password">
        <NuxtPassword v-model="state.password" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Confirm New Password" name="confirmPassword">
        <NuxtPassword
          v-model="state.confirmPassword"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtButton
        type="submit"
        class="mt-2"
        block
        size="lg"
        icon="lucide:check-circle"
        loading-auto
      >
        Submit
      </NuxtButton>
    </NuxtForm>

    <NuxtModal
      v-model:open="open"
      title="Success"
      :close="false"
      :dismissible="false"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <div class="space-y-3">
          <p>
            Your password has been reset successfully! Sign in now to continue.
          </p>
        </div>
      </template>

      <template #footer>
        <NuxtButton to="/sign-in" trailing-icon="lucide:circle-arrow-right">
          Sign in
        </NuxtButton>
      </template>
    </NuxtModal>
  </div>
</template>
