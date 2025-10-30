<script setup lang="ts">
import { ulid } from 'ulid';
import type { DropdownMenuItem } from '@nuxt/ui';
import useFormBuilder from '~/composables/use-form-builder';

const { form, fields } = useFormBuilder(useFormStateContext('form-new'));

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Add field',
    icon: 'lucide:plus',
    onSelect() {
      handleSelect({
        id: ulid(),
        formId: form.value.id,
        label: '',
        type: 'shorttext'
      });
    }
  },
  {
    label: 'Add header',
    icon: 'lucide:heading',
    onSelect() {
      handleSelect({
        id: ulid(),
        formId: form.value.id,
        text: 'New heading',
        type: 'heading'
      });
    }
  },
  {
    label: 'Add divider',
    icon: 'lucide:separator-horizontal',
    onSelect() {
      handleSelect({
        id: ulid(),
        formId: form.value.id,
        type: 'divider',
        style: 'solid',
        color: 'neutral'
      });
    }
  }
]);

function handleSelect(field: FormField) {
  const newField = fields.append(field);
  fields.focus(newField);
}
</script>

<template>
  <NuxtDropdownMenu :items="items">
    <div
      class="border-2 border-accented border-dashed bg-muted rounded-md p-2 flex-center h-20 cursor-pointer"
    >
      <NuxtIcon name="lucide:plus" size="1.5rem" class="text-muted" />
    </div>
  </NuxtDropdownMenu>
</template>
