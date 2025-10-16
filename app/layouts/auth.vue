<template>
  <main class="grid lg:flex">
    <div class="overflow-hidden relative p-3 h-60 md:h-80 lg:h-dvh lg:w-[50%] lg:max-w-[40rem]">
      <div class="absolute top-0 left-0 h-full w-full p-6 z-10">
        <header class="flex items-start justify-between">
          <NuxtLink to="/">
            <Logo size="32" inverted />
          </NuxtLink>

          <NuxtButton
            to="/"
            size="sm"
            color="neutral"
            variant="subtle"
            icon="lucide:arrow-left"
          >
            Back to Website
          </NuxtButton>
        </header>
      </div>

      <div
        class="w-full h-full overflow-hidden rounded-lg lg:border lg:border-default"
      >
      <img src="/img/auth-bg-landscape.jpg" alt="background image" class="fluid object-cover lg:hidden dark:invert">
      
      <img src="/img/auth-bg-portrait.jpg" alt="background image" class="fluid object-cover object-bottom hidden lg:block dark:invert">

      </div>
    </div>

    <div class="lg:h-full lg:overflow-y-auto lg:grow">
      <NuxtPage />
    </div>
  </main>
</template>
