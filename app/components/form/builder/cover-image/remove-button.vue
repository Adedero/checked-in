<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const { header } = useFormBuilder(useFormStateContext('form-new'));
</script>

<template>
  <div>
    <NuxtButton
      icon="lucide:circle-x"
      color="neutral"
      variant="soft"
      size="sm"
      @click="header.setCoverImage(null)"
    >
      Remove cover
    </NuxtButton>
  </div>
</template>
