<script setup lang="ts">
const header = useTemplateRef('header');

const headerBoundingRect = useBoundingClientRect(header);
const openSm = ref<boolean>(false);
const openLg = ref<boolean>(false);
</script>

<template>
  <main class="lg:flex">
    <nav>
      <NuxtSlideover
        v-model:open="openSm"
        side="left"
        :ui="{ content: 'max-w-80' }"
      >
        <template #title>
          <NuxtLink to="/app" class="flex items-center gap-2">
            <Logo />
            <p class="font-bold text-lg">CheckedIn</p>
          </NuxtLink>
        </template>

        <template #body>
          <AppNavigationMenu />
        </template>
      </NuxtSlideover>

      <div
        class="bg-muted hidden lg:block h-dvh overflow-hidden tranition-[width] duration-300 border-r border-default"
        :class="[openLg ? 'w-68' : 'w-0']"
      >
        <header
          class="px-5 flex items-center border-b border-b-default"
          :style="{ height: `${headerBoundingRect.height || 0}px` }"
        >
          <NuxtLink to="/app" class="flex items-center gap-2">
            <Logo />
            <p class="font-bold text-lg">CheckedIn</p>
          </NuxtLink>
        </header>

        <div
          :style="{
            height: `calc(100dvh - ${headerBoundingRect.height || 0}px)`
          }"
        >
          <AppNavigationMenu />
        </div>
      </div>
    </nav>

    <div class="lg:grow">
      <header ref="header">
        <AppHeader v-model:nav-mobile="openSm" v-model:nav-desktop="openLg" />
      </header>

      <section
        class="overflow-y-auto relative"
        :style="{
          height: `calc(100dvh - ${headerBoundingRect.height || 0}px)`
        }"
      >
        <NuxtPage />
      </section>
    </div>
  </main>
</template>
