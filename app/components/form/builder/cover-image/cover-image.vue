<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const formState = useFormStateContext('form-new');
const { form } = useFormBuilder(formState);
</script>

<template>
  <div class="fluid relative z-[1]">
    <FormBuilderCoverImageRemoveButton
      v-show="form.coverImage"
      class="absolute top-4 right-4"
    />
    <FormBuilderCoverImageChangeButton
      v-show="!form.coverImage"
      class="absolute top-4 right-4"
    />

    <img
      v-if="form.coverImage"
      :src="form.coverImage"
      alt="form cover image"
      class="fluid absolute left-0 top-0 object-cover -z-[1]"
    />
  </div>
</template>
