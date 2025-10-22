<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const { fieldId } = defineProps<{
  fieldId: string;
}>();

const { fields } = useFormBuilder(useFormStateContext('form-new'));

function duplicate() {
  const field = fields.duplicate(fieldId, 'append');
  fields.focus(field);
}
</script>

<template>
  <NuxtTooltip text="Duplicate field">
    <NuxtButton icon="lucide:copy" color="neutral" variant="ghost" @click="duplicate" />
  </NuxtTooltip>
</template>
