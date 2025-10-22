<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

interface Props {
  title?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
}

const {
  title = undefined,
  description = undefined,
  breadcrumb = []
} = defineProps<Props>();
</script>

<template>
  <header class="flex items-start gap-2 justify-between flex-wrap">
    <slot name="header">
      <div class="space-y-0.5">
        <slot name="breadcrumb">
          <div v-if="breadcrumb.length > 0">
            <LazyNuxtBreadcrumb :items="breadcrumb" />
          </div>
        </slot>

        <div>
          <slot name="title">
            <h1 class="page-title">{{ title }}</h1>
          </slot>

          <div class="text-muted">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
    </slot>

    <slot name="right" />
  </header>
</template>
