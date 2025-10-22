<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const formState = useFormStateContext('form-new');
const { history } = useFormBuilder(formState);
</script>

<template>
  <NuxtButton
    icon="lucide:undo"
    color="neutral"
    variant="outline"
    :disabled="!history.canUndo.value"
    @click="history.undo"
  />
</template>
.value
