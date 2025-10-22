export default function useBoundingClientRect(el: Ref<HTMLElement | null>) {
  const rect = computed<Partial<DOMRect>>(
    () => el.value?.getBoundingClientRect() || {}
  );
  return rect;
}
