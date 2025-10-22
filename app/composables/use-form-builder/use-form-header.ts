export default function useFormHeader(form: Ref<Form>) {
  const setCoverImage = (image?: string | null) => {
    form.value.coverImage = image;
  };

  const setTitle = (value?: string) => {
    form.value.title = value || 'Untitled Form';
  };

  const setDescription = (value?: string) => {
    form.value.description = value || undefined;
  };

  return {
    setCoverImage,
    setTitle,
    setDescription
  };
}
