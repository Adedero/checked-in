<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';
import Draggable from 'vuedraggable';

interface Props {
  field: NumberField;
}

const props = defineProps<Props>();

const { ID, useFieldRef } = useFormBuilder(useFormStateContext('form-new'));

const field = useFieldRef<NumberField>(props.field.id);

/**
 * Validations
 */
const drag = ref<boolean>(false);

const validationTypes = ref<NumberValidation['type'][]>([
  'min',
  'max',
  'integer',
  'min_fraction_digits',
  'max_fraction_digits',
  'equal',
  'greater_than',
  'less_than',
  'greater_than_or_equal',
  'less_than_or_equal',
  'positive',
  'negative',
  'unique'
]);

function addValidation() {
  const validation: NumberValidation = {
    id: ID(),
    type: 'min',
    value: 1,
    message: ''
  };
  if (field.value.validations) {
    field.value.validations.push(validation);
  } else {
    field.value.validations = [validation];
  }
}

function removeValidation(id: string) {
  if (field.value.validations) {
    field.value.validations = field.value.validations.filter((validation) => validation.id !== id);
  }
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

    <NuxtTooltip text="Add response validation">
      <NuxtButton
        color="neutral"
        variant="ghost"
        icon="lucide:circle-check"
        class="absolute bottom-[0.785rem] right-[4.875rem]"
        @click="addValidation"
      />
    </NuxtTooltip>

    <div v-if="field.validations?.length">
      <Draggable
        v-model="field.validations"
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
        <template #item="{ element }: { element: NumberValidation }">
          <div class="flex border border-default rounded-md pr-0.5">
            <div class="handle flex-center cursor-move p-2">
              <NuxtIcon name="lucide:grip-vertical" />
            </div>

            <div class="grow flex items-center gap-1">
              <NuxtSelect
                v-model="element.type"
                :items="validationTypes"
                variant="soft"
                size="sm"
                class="min-w-28 text-sm"
              />

              <NuxtInput
                v-if="
                  element.type !== 'unique' &&
                  element.type !== 'integer' &&
                  element.type !== 'positive' &&
                  element.type !== 'negative'
                "
                v-model="element.value"
                variant="outline"
                placeholder="Value"
                size="sm"
              />

              <NuxtInput
                v-model="element.message"
                placeholder="Error message"
                size="sm"
                class="grow"
              />

              <NuxtButton
                icon="lucide:x"
                size="sm"
                color="error"
                variant="soft"
                @click="removeValidation(element.id)"
              />
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>
