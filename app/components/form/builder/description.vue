<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import useFormBuilder from '~/composables/use-form-builder';

const { form, header } = useFormBuilder(useFormStateContext('form-new'));

const open = ref<boolean>(false);
const description = ref<string | undefined>(form.value.description);

function update() {
  header.setDescription(description.value?.trim());
  open.value = false;
}
</script>

<template>
  <div v-on-click-outside="() => (open = false)">
    <NuxtInPlace v-model:open="open">
      <div
        class="bg-muted cursor-context-menu p-2 text-muted font-medium transition-colors duration-300 rounded-md hover:bg-elevated"
      >
        <p class="whitespace-pre-wrap">
          {{ form.description || 'No description' }}
        </p>
      </div>

      <template #in-place>
        <div>
          <NuxtTextarea
            v-model="description"
            autoresize
            :rows="1"
            :maxrows="4"
            size="lg"
            class="w-full"
            :ui="{ base: 'text-base' }"
          />

          <div class="flex gap-2 justify-end mt-2">
            <NuxtButton
              label="Cancel"
              color="neutral"
              variant="soft"
              @click="open = false"
            />
            <NuxtButton label="Save" class="shrink-0" @click="update" />
          </div>
        </div>
      </template>
    </NuxtInPlace>
  </div>
</template>
