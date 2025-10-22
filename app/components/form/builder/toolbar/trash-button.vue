<script setup lang="ts">
const { confirmAsync } = useConfirm();

async function trash() {
  try {
    const response = await confirmAsync({
      title: 'Delete Form',
      description: 'Are you sure you want to delete this form?'
    });
    if (!response) return;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <NuxtButton
    icon="lucide:trash-2"
    color="error"
    variant="outline"
    loading-auto
    @click="trash"
  />
</template>
