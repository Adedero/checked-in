<script setup lang="ts">
const stats = [
  {
    label: 'Total Check Ins',
    description: 'Lorem ipsum dolor sit elit.',
    value: 2_340,
    prefix: '',
    suffix: '',
    icon: 'lucide:pointer'
  },
  {
    label: 'Attendance Sessions',
    description: 'Lorem ipsum dolor sit elit.',
    value: 476,
    prefix: '',
    suffix: '',
    icon: 'lucide:clipboard-check'
  },
  {
    label: 'Groups Created',
    description: 'Lorem ipsum dolor sit elit.',
    value: 12,
    prefix: '',
    suffix: '',
    icon: 'lucide:book-check'
  },
  {
    label: 'Groups Joined',
    description: 'Lorem ipsum dolor sit elit.',
    value: 90,
    prefix: '',
    suffix: '',
    icon: 'lucide:users'
  }
];
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <NuxtCard v-for="stat in stats" :key="stat.label">
      <div>
        <div class="flex items-center gap-1 mb-1">
          <NuxtBadge
            v-if="stat.icon"
            :icon="stat.icon"
            color="neutral"
            variant="subtle"
            class="-translate-y-0.5"
          />
          <p class="text-sm font-medium text-muted">
            {{ stat.label }}
          </p>
        </div>

        <p class="font-semibold font-mono text-3xl">
          {{ stat.value }}
        </p>

        <p class="mt-4 text-sm font-semibold">
          {{ stat.description }}
        </p>
      </div>
    </NuxtCard>
  </div>
</template>
