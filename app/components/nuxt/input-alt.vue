<script setup lang="ts">
const modelValue = defineModel<string>();
const attrs = useAttrs();
</script>

<template>
  <NuxtInput
    v-model="modelValue"
    variant="soft"
    v-bind="attrs"
    :ui="{
      base: 'border-b-2 border-b-transparent focus:border-b-secondary focus:rounded-b-none'
    }"
  />
</template>
