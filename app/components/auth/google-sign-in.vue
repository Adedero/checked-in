<script setup lang="ts">
import { authClient, type BetterAuthSessionData } from '~/lib/auth-client';

const { isLastUsed } = defineProps<{
  isLastUsed?: boolean;
}>();

const emit = defineEmits<{
  googleSignIn: [data: BetterAuthSessionData];
}>();

const toast = useToast();

const signIn = async () => {
  await authClient.signIn.social(
    {
      provider: 'google'
    },
    {
      onError: (ctx) => {
        toast.add({
          title: 'Google Sign In Error',
          description: ctx.error.message,
          color: 'error'
        });
      },
      onSuccess: async () => {
        toast.add({
          title: 'Success',
          description: 'Sign in successful',
          color: 'success'
        });

        try {
          const { data, error } = await authClient.getSession();
          if (error || !data) {
            throw new Error('Failed to complete sign in. Try again later.');
          }
          // emit
          emit('googleSignIn', data);
        } catch (error) {
          toast.add({
            title: 'Sign In Error',
            description: normalizeException(error).message,
            color: 'error'
          });
        }
      }
    }
  );
};
</script>

<template>
  <div class="relative">
    <NuxtButton
      block
      color="neutral"
      variant="subtle"
      icon="custom:google-colored"
      size="lg"
      loading-auto
      @click="signIn"
    >
      Google
    </NuxtButton>

    <NuxtBadge
      v-if="isLastUsed"
      color="secondary"
      class="absolute -top-2 -right-2"
    >
      Last used
    </NuxtBadge>
  </div>
</template>
