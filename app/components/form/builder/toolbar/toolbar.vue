<script setup lang="ts"></script>

<template>
  <header
    class="p-3 flex gap-1 items-center justify-evenly"
  >
    <FormBuilderToolbarUndoButton />
    <FormBuilderToolbarRedoButton />

    <NuxtButton icon="lucide:printer" color="neutral" variant="outline" />
    <NuxtButton icon="lucide:view" color="neutral" variant="outline" />
    <NuxtButton icon="lucide:copy" color="neutral" variant="outline" />
    <FormBuilderToolbarTrashButton />
    <NuxtButton icon="lucide:save" color="neutral">Save</NuxtButton>
  </header>
</template>
