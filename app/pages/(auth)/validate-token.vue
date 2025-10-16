<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

useSeoMeta({
  title: 'CheckedIn - Validate Token'
});

const error = useRouteData().getSearchParams('error');
</script>

<template>
  <div class="py-20 px-5 flex">
    <div class="w-full md:w-[70%] md:max-w-[28rem] md:mx-auto">
      <header>
        <h1 class="text-4xl font-bold">Token Validation</h1>
      </header>

      <div class="my-5">
        <div v-if="error">
          <NuxtAlert
            color="error"
            variant="subtle"
            icon="lucide:circle-x"
            title="Validation Failed"
            description="Invalid or expired token. Please, try again later."
            orientation="horizontal"
            :actions="[
              {
                label: 'Retry',
                icon: 'lucide-refresh-cw',
                onClick: () => {
                  navigateTo('/sign-in');
                },
                color: 'error',
                class: 'py-2'
              }
            ]"
          />
        </div>

        <div v-else>
          <NuxtAlert
            color="success"
            variant="subtle"
            icon="lucide-check-circle"
            title="Validation Successful"
            description="Your account has been verified successfully."
            orientation="horizontal"
            :actions="[
              {
                label: 'Continue',
                color: 'success',
                trailingIcon: 'lucide-circle-arrow-right',
                onClick: () => {
                  navigateTo('/sign-in');
                },
                class: 'py-2'
              }
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
