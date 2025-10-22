<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import useFormBuilder from '~/composables/use-form-builder';

const { form, header } = useFormBuilder(useFormStateContext('form-new'));

const open = ref<boolean>(false);
const title = ref<string | undefined>(form.value.title);

function update() {
  header.setTitle(title.value?.trim());
  open.value = false;
}
</script>

<template>
  <div v-on-click-outside="() => (open = false)">
    <NuxtInPlace v-model:open="open">
      <h2
        class="text-2xl font-bold cursor-context-menu px-2 py-1 transition-colors duration-300 rounded-md hover:bg-elevated"
      >
        {{ form.title || 'Untitled Form' }}
      </h2>

      <template #in-place>
        <div class="flex gap-1">
          <NuxtInput
            v-model="title"
            class="w-full"
            :ui="{ base: 'text-xl font-semibold' }"
          />
          <NuxtButton label="Save" class="shrink-0" @click="update" />
        </div>
      </template>
    </NuxtInPlace>
  </div>
</template>
