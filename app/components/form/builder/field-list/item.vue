<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';
import {
  FormBuilderFieldDivider,
  FormBuilderFieldLongText,
  FormBuilderFieldShortText
} from '#components';

const { fields } = useFormBuilder(useFormStateContext('form-new'));

interface Props {
  field: FormField;
}

const props = defineProps<Props>();

const selectedType = computed<FormField['type']>({
  get: () => props.field.type,
  set: (newType: FormField['type']) => {
    if (newType === props.field.type) return;

    const newField = fields.convertFieldType(newType, props.field);
    if (newField) {
      fields.replace(newField, props.field.id);
    }
  }
});

/* watch(
  () => props.field.type,
  (newType) => {
    selectedType.value = newType;
  },
  { deep: true }
); */

const component = computed(() => {
  switch (selectedType.value) {
    case 'shorttext':
      return FormBuilderFieldShortText;
    case 'longtext':
      return FormBuilderFieldLongText;
    case 'divider':
      return FormBuilderFieldDivider;
    default:
      return FormBuilderFieldShortText;
  }
});
</script>

<template>
  <div class="relative">
    <div
      class="border border-default rounded-lg overflow-hidden transition-colors duration-300"
      :class="{ 'border-[3px] border-secondary rounded-br-none': field.isFocused }"
      @pointerdown="fields.focus(field.id)"
    >
      <div class="handle bg-default flex-center p-2 cursor-move">
        <NuxtIcon name="lucide:grip-horizontal" />
      </div>

      <div class="p-3">
        <FormFieldSelect v-model="selectedType" class="w-full" />

        <div class="mt-6">
          <component :is="component" :field />
        </div>
      </div>

      <footer class="p-3 flex items-center justify-end">
        <FormBuilderFieldListItemCopyButton :field-id="field.id" />
        <FormBuilderFieldListItemRemoveButton :field-id="field.id" />
      </footer>
    </div>

    <div
      v-if="field.isFocused"
      class="absolute rounded-b-lg right-0 -bottom-12 z-10 p-2 bg-secondary"
    >
      <FormBuilderFieldListItemFocusedActions :field-id="field.id" />
    </div>
  </div>
</template>
