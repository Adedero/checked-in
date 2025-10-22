export default function useWindowResize(fn: (event: UIEvent) => void) {
  onMounted(() => {
    window.addEventListener('resize', fn);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', fn);
  });
}
