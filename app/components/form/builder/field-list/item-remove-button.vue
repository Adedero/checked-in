<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const { fieldId } = defineProps<{
  fieldId: string;
}>();

const { fields } = useFormBuilder(useFormStateContext('form-new'));

function remove() {
  fields.remove(fieldId);
}
</script>

<template>
  <NuxtTooltip text="Delete field">
    <NuxtButton icon="lucide:trash-2" color="error" variant="ghost" @click="remove" />
  </NuxtTooltip>
</template>
