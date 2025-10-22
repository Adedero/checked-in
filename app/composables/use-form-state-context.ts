export default function useFormStateContext(key: string) {
  const state = inject<FormState>(key);

  onMounted(() => {
    if (!state) {
      throw createError({
        statusCode: 400,
        message:
          'Form child component could not access the form state context.',
        fatal: true
      });
    }
  });

  return state!;
}
