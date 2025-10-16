<script lang="ts" setup>
interface Props {
  inverted?: boolean;
  size?: string | number;
}

const { size = 24, inverted = false } = defineProps<Props>();

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const colors = computed(() => {
  if (isDark.value) {
    return {
      foreground: inverted ? 'white' : 'black',
      background: inverted ? 'black' : 'white'
    };
  } else {
    return {
      foreground: inverted ? 'black' : 'white',
      background: inverted ? 'white' : 'black'
    };
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="36" cy="36" r="36" :fill="colors.background" />
    <circle cx="11" cy="36" r="4" :fill="colors.foreground" />
    <circle cx="61" cy="36" r="4" :fill="colors.foreground" />
    <rect
      x="25.6606"
      y="16.4984"
      width="8"
      height="32.4727"
      rx="4"
      transform="rotate(22 25.6606 16.4984)"
      :fill="colors.foreground"
    />
    <rect
      x="49.1645"
      y="25"
      width="8"
      height="27.9089"
      rx="4"
      transform="rotate(22 49.1645 25)"
      :fill="colors.foreground"
    />
    <rect
      x="42.1645"
      y="9"
      width="8"
      height="54.4147"
      rx="4"
      transform="rotate(22 42.1645 9)"
      :fill="colors.foreground"
    />
  </svg>
</template>
