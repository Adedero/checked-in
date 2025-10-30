<script setup lang="ts">
definePageMeta({
  layout: 'app'
});

useSeoMeta({
  title: 'CheckedIn - Sessions'
});
</script>

<template>
  <div class="px-5 py-3">
    <AppPageHeader title="Sessions">
      <template #description>
        Total attendance sessions:
        <span class="text-default font-semibold font-mono">234</span>
      </template>

      <template #right>
        <UserSessionCreateButton />
      </template>
    </AppPageHeader>

    <NuxtCard>
      <div class="flex-cen">
        <!-- <NuxtEmpty
          icon="i-lucide-file"
          title="No sessions found"
          description="It looks like you haven't created any sessions. Create one to get started."
          :actions="[
            {
              icon: 'i-lucide-plus',
              label: 'Create new'
            },
            {
              icon: 'i-lucide-refresh-cw',
              label: 'Refresh',
              color: 'neutral',
              variant: 'subtle'
            }
          ]"
        /> -->
      </div>
    </NuxtCard>
  </div>
</template>
