<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const { fieldId } = defineProps<{
  fieldId: string;
}>();

const { formId, fields, ID } = useFormBuilder(useFormStateContext('form-new'));

function handleClick(field: FormField) {
  const newField = fields.append(field, fieldId);
  fields.focus(newField);
}
</script>

<template>
  <div class="flex justify-end gap-2">
    <NuxtTooltip text="Add field">
      <NuxtButton
        icon="lucide:circle-plus"
        color="neutral"
        variant="soft"
        @click="
          handleClick({
            id: ID(),
            formId: formId,
            label: '',
            type: 'shorttext'
          })
        "
      />
    </NuxtTooltip>
    <NuxtTooltip text="Add heading">
      <NuxtButton
        icon="lucide:heading"
        color="neutral"
        variant="soft"
        @click="
          handleClick({
            id: ID(),
            formId: formId,
            type: 'heading',
            text: 'New header'
          })
        "
      />
    </NuxtTooltip>
    <NuxtTooltip text="Add divider">
      <NuxtButton
        icon="lucide:separator-horizontal"
        color="neutral"
        variant="soft"
        @click="
          handleClick({
            id: ID(),
            formId: formId,
            type: 'divider',
            style: 'solid',
            color: 'neutral'
          })
        "
      />
    </NuxtTooltip>
  </div>
</template>
