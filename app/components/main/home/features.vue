<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

const items = [
  {
    label: 'Real-Time Tracking',
    heading: 'Monitor attendance as it happens',
    description:
      "Track who's present instantly with live updates across all your devices. No more waiting until end of day to know who showed up. Get immediate notifications and insights the moment attendance is marked.",
    labelIcon: 'i-lucide-clock'
  },
  {
    label: 'Smart Reports',
    heading: 'Generate insights in seconds',
    description:
      'Create detailed attendance reports with just a few clicks. Filter by date, user, department, or custom criteria. Export to PDF or Excel for easy sharing with stakeholders and compliance documentation.',
    labelIcon: 'i-lucide-bar-chart-3'
  },
  {
    label: 'Multi-User Access',
    heading: 'Collaborate with your team',
    description:
      'Assign different roles and permissions to teachers, managers, or administrators. Everyone gets the access they need without compromising security. Manage multiple classes, departments, or locations from one dashboard.',
    labelIcon: 'i-lucide-users'
  },
  {
    label: 'Automated Alerts',
    heading: 'Stay informed effortlessly',
    description:
      'Receive automatic notifications for absences, late arrivals, or unusual patterns. Set custom triggers based on your needs. Parents, managers, and admins stay in the loop without manual follow-ups.',
    labelIcon: 'i-lucide-bell'
  }
] satisfies TabsItem[];
</script>

<template>
  <div class="py-20 px-5 md:px-10">
    <header class="mb-6">
      <h2 class="text-center text-5xl font-bold">
        <p>Everything you need</p>
        <p class="text-dimmed">Nothing you don't</p>
      </h2>
    </header>

    <NuxtTabs
      :items="items"
      color="secondary"
      variant="link"
      :ui="{ trigger: 'grow' }"
      class="gap-4 w-full relative"
    >
      <template #default="{ item }">
        <div class="absolute top-8 left-0 w-full flex items-center gap-1">
          <NuxtIcon :name="item.labelIcon" />
          <span class="font-semibold">
            {{ item.label }}
          </span>
        </div>
      </template>

      <template #content="{ item }">
        <div class="mt-12 max-w-full flex gap-5 items-start">
          <div class="bg-elevated rounded-lg h-40 w-60"></div>
          <div class="space-y-2">
            <p class="font-bold text-2xl">{{ item.heading }}</p>
            <p class="text-muted">
              {{ item.description }}
            </p>
          </div>
        </div>
      </template>
    </NuxtTabs>
  </div>
</template>
