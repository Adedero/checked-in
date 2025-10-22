<script setup lang="ts">
definePageMeta({
  layout: 'app'
});

useSeoMeta({
  title: 'CheckedIn - Dashboard'
});
</script>

<template>
  <div class="px-5 py-3">
    <AppPageHeader title="Dashboard" />

    <div class="space-y-5">
      <AppDashboardStats />

      <NuxtCard>
        <div>
          <header class="flex items-center justify-between gap-2 flex-wrap">
            <p class="section-title">Recents</p>
          </header>
        </div>
      </NuxtCard>

      <NuxtCard>
        <div>
          <header class="flex items-center justify-between gap-2 flex-wrap">
            <p class="section-title">Check Ins</p>
          </header>
        </div>
      </NuxtCard>
    </div>
  </div>
</template>
