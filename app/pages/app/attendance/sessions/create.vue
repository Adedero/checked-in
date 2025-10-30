<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

definePageMeta({
  layout: 'app'
});

useSeoMeta({
  title: 'CheckedIn - Create Session'
});

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Sessions',
    to: '/app/attendance/sessions'
  },
  {
    label: 'Create',
    to: '/app/attendance/sessions/create'
  }
];
</script>

<template>
  <div class="px-5 py-3">
    <AppPageHeader title="Create Session">
      <template #breadcrumb>
        <NuxtBreadcrumb :items="breadcrumbs" />
      </template>
    </AppPageHeader>

    <div class="mt-10">
      <UserSessionCreateFlow />
    </div>
  </div>
</template>
