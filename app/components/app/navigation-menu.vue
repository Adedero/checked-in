<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    type: 'label'
  },
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/app'
  },
  {
    label: 'Check In',
    icon: 'lucide:map-pin-check'
  },
  {
    label: 'Attendance',
    icon: 'lucide:clipboard-check',
    open: true,
    children: [
      {
        label: 'Sessions',
        icon: 'lucide:clipboard-clock',
        to: '/app/attendance/sessions'
      },
      {
        label: 'Check Ins',
        icon: 'lucide:pointer',
        to: '/app/attendance/check-ins'
      }
    ]
  },
  {
    label: 'Groups',
    icon: 'lucide:users',
    children: [
      {
        label: 'Groups Created',
        icon: 'lucide:book-user'
      },
      {
        label: 'Groups Joined',
        icon: 'lucide:user-plus'
      }
    ]
  },
  {
    label: 'Forms',
    icon: 'lucide:file-input',
    to: '/app/forms'
  },
  {
    label: 'User',
    type: 'label'
  },
  {
    label: 'Account',
    icon: 'lucide:user-cog',
    children: [
      {
        label: 'Profile',
        icon: 'lucide:user-circle'
      },
      {
        label: 'Billing',
        icon: 'lucide:credit-card'
      }
    ]
  },
  {
    label: 'Notifications',
    icon: 'lucide:bell'
  },
  {
    label: 'Settings',
    icon: 'lucide:settings'
  },
  {
    label: 'Actions',
    type: 'label'
  },
  {
    label: 'Back to website',
    icon: 'lucide:globe',
    to: '/'
  },
  {
    label: 'Sign out',
    icon: 'lucide:log-out'
  }
];
</script>

<template>
  <div
    class="w-full h-full max-h-full overflow-y-auto lg:py-2 lg:px-3 flex flex-col gap-2 justify-between"
  >
    <NuxtNavigationMenu :items orientation="vertical" />

    <div class="flex-shrink-0 lg:px-3">
      <UserQuickLinksDropdown>
        <NuxtButton
          trailing-icon="lucide:chevrons-up-down"
          color="neutral"
          variant="ghost"
          block
        >
          <NuxtUser
            :avatar="{
              src: authStore.user.value?.image || undefined,
              alt: authStore.user.value?.name
            }"
            :name="authStore.user.value?.name"
            :description="authStore.user.value?.email"
          />
        </NuxtButton>
      </UserQuickLinksDropdown>
    </div>
  </div>
</template>
