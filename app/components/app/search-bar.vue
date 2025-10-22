<script setup lang="ts">
interface Props {
  iconOnly?: boolean;
}

const { iconOnly = false } = defineProps<Props>();
</script>

<template>
  <div>
    <NuxtButton
      v-if="iconOnly"
      icon="lucide:search"
      color="neutral"
      variant="outline"
    />
    <NuxtFieldGroup v-else class="w-full border border-muted rounded-md">
      <NuxtInput variant="none" placeholder="Search..." class="w-full" />
      <NuxtButton icon="lucide:search" color="neutral" variant="link" />
    </NuxtFieldGroup>
  </div>
</template>
