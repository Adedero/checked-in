<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

interface Props {
  field: HeadingField;
}

const props = defineProps<Props>();

const { useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<HeadingField>(props.field.id);

</script>

<template>
  <div>
    <NuxtInput
      v-model="field.text"
      placeholder="Edit text"
      variant="none"
      class="w-full"
      size="lg"
      :ui="{
        base: ['text-3xl font-semibold']
      }"
    />

    <NuxtTextarea
      v-model="field.description"
      placeholder="Edit description (optional)"
      :rows="1"
      autoresize
      :maxrows="3"
      variant="ghost"
      class="mt-2 w-full"
    />
  </div>
</template>
