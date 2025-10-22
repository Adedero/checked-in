<script setup lang="ts">
import useFormBuilder from '~/composables/use-form-builder';

const { header } = useFormBuilder(useFormStateContext('form-new'));
const toast = useToast();

const MAX_IMG_SIZE = 2 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const loading = ref<boolean>(false);
async function handleInput(event: Event) {
  loading.value = true;
  try {
    const fileList = (event.target as HTMLInputElement).files;
    const file = fileList?.[0];
    if (!file) {
      throw new Error('No file selected');
    }

    if (!isFileTypeValid(file)) {
      const formatedExtensions = ALLOWED_EXTENSIONS.map((ext) =>
        ext.split('.').pop()
      ).join(' ,');
      const error = new Error(`Allowed formats include: ${formatedExtensions}`);
      error.name = 'File format not allowed';
      throw error;
    }

    if (!isFileSizeValid(file)) {
      const error = new Error('Cover image must be 2MB or less');
      error.name = 'File too large';
      throw error;
    }

    const url = await getDataURL(file);

    header.setCoverImage(url);
  } catch (error) {
    if (error instanceof Error) {
      toast.add({
        color: 'error',
        title: error.name || 'Error',
        description: error.message
      });
    } else {
      toast.add({
        color: 'error',
        title: 'Error',
        description: normalizeException(error).message
      });
    }
  } finally {
    loading.value = false;
  }
}

async function getDataURL(file: File): Promise<string> {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function isFileSizeValid(file: File) {
  return file.size <= MAX_IMG_SIZE;
}

function isFileTypeValid(file: File) {
  const ext = file.name.split('.').pop();
  return ALLOWED_EXTENSIONS.some((e) => `.${ext}` === e);
}
</script>

<template>
  <div>
    <label for="form-cover-image">
      <NuxtButton
        icon="lucide:image"
        color="neutral"
        variant="soft"
        size="sm"
        class="pointer-events-none"
        :loading
      >
        Change cover
      </NuxtButton>
    </label>

    <input
      id="form-cover-image"
      type="file"
      class="hidden"
      :multiple="false"
      :accept="ALLOWED_EXTENSIONS.join()"
      @input="handleInput"
    />
  </div>
</template>
