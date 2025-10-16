<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Reset Password'
});
</script>

<template>
  <div class="py-20 px-5 flex">
    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Reset password</h1>
      </header>

      <div class="my-5">
        <AuthResetPasswordForm />
      </div>
    </div>
  </div>
</template>
