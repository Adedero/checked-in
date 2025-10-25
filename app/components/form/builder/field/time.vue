<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

interface Props {
  field: TimeField;
}

const props = defineProps<Props>();

const { useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<TimeField>(props.field.id);
</script>

<template>
  <div>
    <NuxtInput
      v-model="field.label"
      placeholder="Edit label"
      variant="none"
      class="w-full"
      size="lg"
      :ui="{
        base: ['font-semibold']
      }"
    />

    <NuxtInput
      v-model="field.placeholder"
      placeholder="Edit placeholder (optional)"
      variant="soft"
      class="w-full"
      size="lg"
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

    <div class="absolute left-5 bottom-[1.2rem] flex items-center gap-2">
      <NuxtSwitch v-model="field.required" />
      <span class="text-sm font-semibold">Required</span>
    </div>
  </div>
</template>
