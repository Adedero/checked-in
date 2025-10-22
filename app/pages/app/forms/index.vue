<script setup lang="ts">
definePageMeta({
  layout: 'app'
});

useSeoMeta({
  title: 'CheckedIn - Forms'
});
</script>

<template>
  <div class="px-5 py-3">
    <AppPageHeader title="Forms">
      <template #description>
        Total forms:
        <span class="text-default font-semibold font-mono">234</span>
      </template>
    </AppPageHeader>

    <div class="mt-8 mb-4 flex items-center gap-2 justify-between">
      <NuxtInput placeholder="Search forms..." class="w-full max-w-80" />
      <NuxtButton to="/app/forms/new" icon="lucide:plus" color="secondary"> New </NuxtButton>
    </div>

    <NuxtCard> Forms </NuxtCard>
  </div>
</template>
