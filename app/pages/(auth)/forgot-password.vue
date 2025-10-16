<script setup lang="ts">
import z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';

definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Forgot Password'
});

const { appName } = useRuntimeConfig().public;

const schema = z.object({ email: z.email('Invalid email') });
type Schema = z.infer<typeof schema>;

const state = ref<Partial<Schema>>({});

function reset() {
  state.value = {};
}

/**
 * Success modal
 */
const open = ref<boolean>(false);
const error = ref<Error | null>(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = null;

  await authClient.requestPasswordReset(
    {
      email: event.data.email,
      redirectTo: '/reset-password'
    },
    {
      onError(ctx) {
        error.value = normalizeException(ctx.error);
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
  <div class="pt-5 pb-20 px-5 flex flex-col gap-y-16">
    <div class="flex justify-end">
      <p class="text-sm text-muted">
        Go back to
        <NuxtLink class="link" to="/sign-in"> sign in. </NuxtLink>
      </p>
    </div>

    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Forgot password</h1>
        <p class="text-sm mt-2">
          If you've forgotten your password, we can help you recover your
          {{ appName }} account.
        </p>
      </header>

      <div>
        <div class="my-5">
          <div v-if="error" class="mb-3">
            <FetchErrorAlert :message="error.message" />
          </div>

          <NuxtForm :schema :state class="space-y-4" @submit.prevent="onSubmit">
            <NuxtFormField label="Email" name="email">
              <NuxtInput v-model="state.email" size="lg" class="w-full" />
            </NuxtFormField>

            <NuxtButton
              type="submit"
              class="mt-2 w-full flex-center"
              size="lg"
              icon="lucide:check-circle"
              loading-auto
            >
              Submit
            </NuxtButton>
          </NuxtForm>
        </div>

        <NuxtModal v-model:open="open" title="Password reset request">
          <template #body>
            <div class="space-y-3">
              <p>
                Click the link that has been sent to your email address to
                complete the password recovery process.
              </p>

              <NuxtAlert
                variant="subtle"
                color="warning"
                icon="lucide:triangle-alert"
                :ui="{
                  description: 'text-[0.8rem]'
                }"
                :description="`If you do not see an email, you may not have an ${appName} account.`"
              />
            </div>
          </template>
        </NuxtModal>
      </div>
    </div>
  </div>
</template>
