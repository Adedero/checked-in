<script setup lang="ts">
import { defaultForm } from '~/data/form';

definePageMeta({
  layout: 'app'
});

useSeoMeta({
  title: 'CheckedIn - New Form'
});

const form = useFormState(defaultForm, {
  storageKey: 'form-new',
  deep: true,
  debounce: 1000
});

provide<FormState>('form-new', form);
</script>

<template>
  <div class="h-full lg:flex">
    <section class="h-full overflow-y-auto lg:grow relative">
      <header class="flex items-center justify-between sticky top-0 z-10 bg-default">
        <p class="text-lg font-medium px-3 max-w-[60%] truncate">
          {{ form.state.value.title }}
        </p>
        <FormBuilderToolbar />
      </header>

      <div class="h-56 z-[0] relative overflow-hidden bg-gradient-to-r from-blue-300 to-purple-300">
        <FormBuilderCoverImage />
      </div>

      <div class="z-[1] w-[95%] md:w-[80%] lg:w-[70%] mx-auto -translate-y-20 space-y-6">
        <NuxtCard>
          <div class="space-y-2">
            <FormBuilderTitle />
            <FormBuilderDescription />
          </div>
        </NuxtCard>

        <FormBuilderFieldList />

        <FormBuilderAddFieldButton />
      </div>
    </section>
  </div>
</template>
