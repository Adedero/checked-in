<script setup lang="ts">
import Draggable from 'vuedraggable';
import useFormBuilder from '~/composables/use-form-builder';

const { form } = useFormBuilder(useFormStateContext('form-new'));

const drag = ref<boolean>(false);

const dragOptions = computed(() => ({
  animation: 200,
  disabled: false,
  ghostClass: 'ghost'
}));
</script>

<template>
  <Draggable
    v-model="form.fields"
    class="space-y-6"
    group="fields"
    item-key="id"
    handle=".handle"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }: { element: FormField }">
      <FormBuilderFieldListItem :field="element" />
    </template>
  </Draggable>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background-color: var(--background-color-muted);
}
</style>
