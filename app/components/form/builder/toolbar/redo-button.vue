<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const formState = useFormStateContext('form-new');
const { history } = useFormBuilder(formState);
</script>

<template>
  <NuxtButton
    icon="lucide:redo"
    color="neutral"
    variant="outline"
    :disabled="!history.canRedo.value"
    @click="history.redo"
  />
</template>
.value
