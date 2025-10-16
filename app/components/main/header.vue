<script setup lang="ts">
import { mainLinks } from '~/constants/navigation-links';

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-default/5 backdrop-blur-sm border-b border-b-muted px-5 py-3 lg:px-10"
  >
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <Logo />
        <span class="font-bold text-xl text-black dark:text-white">
          {{ appName.replace(' ', '') }}
        </span>
      </NuxtLink>

      <nav class="hidden lg:block">
        <NuxtNavigationMenu :items="mainLinks" />
      </nav>

      <div class="flex items-center gap-2">
        <div>
          <ColorModeButton />
        </div>

        <div class="lg:hidden">
          <NuxtButton icon="lucide:menu" color="neutral" variant="outline" />
        </div>

        <div class="hidden lg:contents">
          <NuxtButton
            icon="lucide:circle-fading-plus"
            color="neutral"
            variant="outline"
            to="/sign-up"
          >
            Get Started
          </NuxtButton>
          <NuxtButton icon="lucide:map-pin-check"> Check In </NuxtButton>
        </div>
      </div>
    </div>
  </header>
</template>
