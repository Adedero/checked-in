<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import { authClient } from '~/lib/auth-client';

definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Verify Email'
});

const toast = useToast();
const email = useRouteData().getSearchParams('email');

const decodedEmail = computed<string>(() => atob(email ?? ''));

const { state, executeImmediate: sendVerificationMail } = useAsyncState(
  async function () {
    return await authClient.sendVerificationEmail(
      {
        email: decodedEmail.value,
        callbackURL: '/validate-token'
      },
      {
        onError: (ctx) => {
          toast.add({
            title: 'Error',
            description: ctx.error.message,
            color: 'error'
          });
        },
        onSuccess: () => {
          toast.add({
            title: 'Success',
            description: 'Verification email sent successfully',
            color: 'success'
          });
        }
      }
    );
  },
  null
);

onMounted(() => {
  if (!decodedEmail.value) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'We could not verifiy your email due to incomplete data. Try signing up again.',
      fatal: true
    });
  }
});
</script>

<template>
  <div class="py-20 px-5 flex">
    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Verify your email</h1>
        <p class="text-sm mt-2">
          You must verify your email address to continue.
        </p>
      </header>

      <div class="my-5">
        <div v-if="state?.error">
          <FetchErrorAlert
            :message="normalizeException(state.error).message"
            show-retry
            @retry="sendVerificationMail()"
          />
        </div>

        <div v-else>
          <div>
            <p v-if="decodedEmail" class="flex items-center gap-1 flex-wrap">
              Email: <b>{{ maskEmail(decodedEmail) }}</b>
            </p>

            <NuxtAlert
              color="secondary"
              variant="subtle"
              description="A verification link has been sent to your email. Click on it to
              verify your account."
              icon="lucide:circle-alert"
              class="mt-4"
            />
          </div>

          <div class="mt-4 flex items-center">
            <p class="text-muted text-sm">
              Didn't receive the email? Check your spam folder or
            </p>
            <NuxtButton
              variant="link"
              loading-auto
              @click="sendVerificationMail()"
            >
              Resend
            </NuxtButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
