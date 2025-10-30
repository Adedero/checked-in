<script setup lang="ts">
import type { SeparatorProps } from '@nuxt/ui';
import useFormBuilder from '~/composables/use-form-builder';
import { vOnClickOutside } from '@vueuse/components';

interface Props {
  field: DividerField;
}

const props = defineProps<Props>();

const { useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<DividerField>(props.field.id);

const styles = ref<NonNullable<DividerField['style']>[]>([
  'solid',
  'dashed',
  'dotted'
]);
const colors = ref<NonNullable<SeparatorProps['color']>[]>([
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
  'neutral'
]);
</script>

<template>
  <div class="space-y-4">
    <NuxtSeparator :type="field.style" :color="field.color">
      <NuxtInPlace>
        <p
          class="px-2 py-1 bg-elevated rounded-md text-muted text-sm font-semibold italic cursor-context-menu"
        >
          {{ field.text || 'Add label' }}
        </p>
        <template #in-place="{ close }">
          <NuxtInput
            v-model="field.text"
            v-on-click-outside="close"
            size="sm"
            class="w-32"
          />
        </template>
      </NuxtInPlace>
    </NuxtSeparator>

    <div class="flex items-center gap-x-2 justify-end">
      <NuxtSelect v-model="field.style" :items="styles" />
      <NuxtSelect v-model="field.color" :items="colors">
        <template #leading>
          <div class="size-5 flex-center">
            <NuxtChip :color="field.color" size="lg" />
          </div>
        </template>
      </NuxtSelect>
    </div>
  </div>
</template>
