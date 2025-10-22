<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: authStore.user.value?.name,
      avatar: {
        src: authStore.user.value?.image || undefined,
        alt: authStore.user.value?.name
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'lucide:user'
    },
    {
      label: 'Check In',
      icon: 'lucide:pointer'
    }
  ],
  [
    {
      label: 'Billing',
      icon: 'lucide:credit-card'
    },
    {
      label: 'Notifications',
      icon: 'lucide:bell'
    },
    {
      label: 'Settings',
      icon: 'lucide:settings'
    }
  ],
  [
    {
      label: 'Sign out',
      icon: 'lucide:log-out'
    }
  ]
]);
</script>

<template>
  <NuxtDropdownMenu :items :ui="{ content: 'w-48' }">
    <slot />
  </NuxtDropdownMenu>
</template>
