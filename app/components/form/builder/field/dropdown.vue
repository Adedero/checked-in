<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';
import Draggable from 'vuedraggable';

interface Props {
  field: SelectField;
}

const props = defineProps<Props>();

const { ID, useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<SelectField>(props.field.id);

/**
 * Options
 */
const drag = ref<boolean>(false);

function addOption() {
  const value = 'Option ' + (field.value.options.length + 1);
  field.value.options.push({ id: ID(), value });
}

function removeOption(value: string) {
  field.value.options = field.value.options.filter((option) => option.id !== value);
}

function isDuplicate(value: SelectField['options'][number]) {
  return field.value.options.some(
    (option) => option.id !== value.id && option.value === value.value
  );
}
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

    <div>
      <Draggable
        v-model="field.options"
        class="mt-2 space-y-2"
        group="fields"
        item-key="id"
        handle=".handle"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        :animation="200"
        :disabled="false"
        ghost-class="ghost-drag"
        @start="drag = true"
        @end="drag = false"
      >
        <template
          #item="{ element, index }: { element: SelectField['options'][number]; index: number }"
        >
          <div>
            <div class="flex items-center gap-x-1">
              <div class="handle flex-center gap-x-2 cursor-move p-2">
                <NuxtIcon name="lucide:grip-vertical" />

                {{ index + 1 }}.
              </div>

              <NuxtInput
                v-model="element.value"
                variant="soft"
                class="grow"
              />

              <NuxtButton
                icon="lucide:x"
                size="sm"
                color="error"
                variant="ghost"
                @click="removeOption(element.id)"
              />
            </div>

            <p v-if="isDuplicate(element)" class="text-xs font-semibold text-error-500">
              Option already exists
            </p>
          </div>
        </template>
      </Draggable>

      <NuxtButton
        icon="lucide:plus"
        size="sm"
        color="neutral"
        variant="ghost"
        class="mt-2"
        @click="addOption"
      >
        Add option
      </NuxtButton>
    </div>
  </div>
</template>
