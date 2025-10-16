<script setup lang="ts">
import type { BetterAuthSessionData } from '~/lib/auth-client';
import { useAuthStore, type SignInClient } from '~/stores/auth.store';

definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Sign In'
});

const route = useRoute();
const authStore = useAuthStore();

const isLastUsed = function (client: SignInClient) {
  return authStore.lastSignInClient.value === client;
};

const handleEmailSignIn = (data: BetterAuthSessionData) => {
  // Update auth store
  authStore.setSession(data.session);
  authStore.setUser(data.user);
  authStore.setLastSignInClient('email');

  // Handle redirect based on roles
  const { role } = data.user;

  handleNavigation(role);
};

const handleGoogleSignIn = (data: BetterAuthSessionData) => {
  // Update auth store
  authStore.setSession(data.session);
  authStore.setUser(data.user);
  authStore.setLastSignInClient('google');

  // Handle redirect based on roles
  const { role } = data.user;

  handleNavigation(role);
};

function handleNavigation(role: string) {
  const { redirect } = route.query;

  if (role === 'user') {
    if (redirect) {
      navigateTo(redirect.toString());
      return;
    }
    navigateTo('/app');
    return;
  }

  if (role === 'admin') {
    if (redirect) {
      navigateTo(redirect.toString());
      return;
    }
    navigateTo('/admin');
    return;
  }
}
</script>

<template>
  <div class="py-20 px-5 flex">
    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Welcome back!</h1>
        <p class="text-sm mt-2">
          Don't have an account?
          <NuxtLink to="/sign-up" class="link">Sign up</NuxtLink>
        </p>
      </header>

      <div class="mt-10">
        <AuthSignInForm
          :is-last-used="isLastUsed('email')"
          @sign-in="handleEmailSignIn"
        />
      </div>

      <NuxtSeparator class="my-5">
        <span class="text-sm"> Or continue with </span>
      </NuxtSeparator>

      <AuthGoogleSignIn
        :is-last-used="isLastUsed('google')"
        @google-sign-in="handleGoogleSignIn"
      />
    </div>
  </div>
</template>
