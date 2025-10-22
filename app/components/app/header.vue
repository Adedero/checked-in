<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();

const keys = {
  sm: 'nav-mobile-open',
  lg: 'nav-desktop-open'
};

const isMobileNavOpen = defineModel<boolean>('nav-mobile', { default: false });
const isDesktopNavOpen = defineModel<boolean>('nav-desktop', {
  default: false
});

const toggleSm = useToggle(isMobileNavOpen);
const toggleLg = useToggle(isDesktopNavOpen);

useWindowResize((event) => {
  event.preventDefault();
  isMobileNavOpen.value = false;
});

watch([isMobileNavOpen, isDesktopNavOpen], ([sm, lg]) => {
  globalThis.localStorage?.setItem(keys.sm, sm.toString());
  globalThis.localStorage?.setItem(keys.lg, lg.toString());
});

onMounted(() => {
  if (import.meta.client) {
    isMobileNavOpen.value = localStorage.getItem(keys.sm) === 'true';
    isDesktopNavOpen.value = localStorage.getItem(keys.lg) === 'true';
  }
});
</script>

<template>
  <div class="flex items-center gap-x-5 px-5 py-3 border-b border-b-default">
    <div class="flex items-center gap-2 grow">
      <NuxtButton
        icon="lucide:panel-left"
        color="neutral"
        variant="outline"
        class="lg:hidden"
        @click="toggleSm()"
      />

      <NuxtButton
        icon="lucide:panel-left"
        color="neutral"
        variant="outline"
        class="hidden lg:flex"
        @click="toggleLg()"
      />

      <NuxtSeparator orientation="vertical" class="lg:hidden h-5 shrink-0" />

      <div class="lg:hidden">
        <Logo size="28" />
      </div>

      <div class="hidden lg:block lg:w-full">
        <AppSearchBar />
      </div>
    </div>

    <NuxtSeparator
      orientation="vertical"
      class="hidden lg:block h-5 shrink-0"
    />

    <div class="flex items-center gap-2 shrink-0">
      <ColorModeButton />

      <div class="lg:hidden">
        <AppSearchBar icon-only />
      </div>

      <NuxtButton icon="lucide:settings" color="neutral" variant="outline" />

      <UserNotificationButton />

      <UserQuickLinksDropdown>
        <NuxtAvatar
          :src="authStore.user.value?.image || undefined"
          :alt="authStore.user.value?.name"
          size="lg"
        />
      </UserQuickLinksDropdown>

      <NuxtButton class="hidden lg:flex" color="neutral" variant="subtle">Check in</NuxtButton>
    </div>
  </div>
</template>
