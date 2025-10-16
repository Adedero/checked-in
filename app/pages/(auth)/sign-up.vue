<script setup lang="ts">
import type { SignUpPayload } from '~/components/auth/sign-up-form.vue';

definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Sign Up'
});

const handleEmailSignUp = ({ email }: SignUpPayload) => {
  navigateTo({
    name: 'verify-email',
    query: { email: btoa(email) }
  });
};

const handleGoogleSignIn = () => {
  // do some shit
};
</script>

<template>
  <div class="py-20 px-5 flex">
    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Create an account</h1>
        <p class="text-sm mt-2">
          Already have an account?
          <NuxtLink to="/sign-in" class="link">Sign in</NuxtLink>
        </p>
      </header>

      <div class="mt-10">
        <AuthSignUpForm @sign-up="handleEmailSignUp" />
      </div>

      <NuxtSeparator class="my-5">
        <span class="text-sm"> Or continue with </span>
      </NuxtSeparator>

      <AuthGoogleSignIn @google-sign-in="handleGoogleSignIn" />
    </div>
  </div>
</template>
