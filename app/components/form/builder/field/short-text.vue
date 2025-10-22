<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

interface Props {
  field: ShortTextField;
}

const props = defineProps<Props>();

const { useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<ShortTextField>(props.field.id);

const label = ref(field.value.label);
const placeholder = ref(field.value.placeholder);
const description = ref(field.value.description);
</script>

<template>
  <div>
    <div class="grid md:grid-cols-2 gap-3">
      <NuxtFormField label="Field label">
        <NuxtInput
          v-model="label"
          placeholder="Ex. Name"
          variant="soft"
          class="w-full"
          :ui="{
            base: 'border-b-2 border-b-transparent focus:border-b-secondary focus:rounded-b-none'
          }"
        />
      </NuxtFormField>

      <NuxtFormField label="Placeholder (optional)">
        <NuxtInput
          v-model="placeholder"
          placeholder="Ex. John Doe"
          variant="soft"
          class="w-full"
          :ui="{
            base: 'border-b-2 border-b-transparent focus:border-b-secondary focus:rounded-b-none'
          }"
        />
      </NuxtFormField>

      <NuxtFormField label="Description (optional)" class="md:col-span-2">
        <NuxtTextarea
          v-model="description"
          variant="soft"
          autoresize
          :rows="1"
          :maxrows="3"
          class="w-full"
        />
      </NuxtFormField>
    </div>
  </div>
</template>
