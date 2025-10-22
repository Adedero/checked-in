<script setup lang="ts">
import { formFieldSelectItems, type FormFieldSelectItem } from '~/data/form';

const items = ref([...formFieldSelectItems]);

const modelValue = defineModel<FormField['type']>();

const selectedItem = ref<FormFieldSelectItem>();

watch(
  () => modelValue.value,
  (newValue) => {
    const item = items.value.find((i) => i.value === newValue);
    if (item) {
      selectedItem.value = item;
    }
  },
  { immediate: true }
);

watch(selectedItem, (newItem) => {
  if (newItem) {
    modelValue.value = newItem.value;
  }
});

defineExpose({
  getSelectedItem() {
    return selectedItem.value;
  }
});
</script>

<template>
  <NuxtSelectMenu v-model="selectedItem" :items="items" />
</template>
