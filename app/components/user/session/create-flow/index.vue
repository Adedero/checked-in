<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui';

const stepper = useTemplateRef('stepper');

const items: StepperItem[] = [
  {
    slot: 'form' as const,
    title: 'Data',
    icon: 'lucide:layout-list'
  },
  {
    slot: 'location' as const,
    title: 'Location',
    icon: 'lucide:map-pin'
  },
  {
    slot: 'settings' as const,
    title: 'Settings',
    icon: 'lucide:settings'
  }
];

const state = ref<Partial<SessionCreationState>>({});

provide('session-create-state', state);
</script>

<script lang="ts">
export interface SessionCreationState {
  isRestricted: boolean;
  focusPointName: string;
  lat: number;
  lng: number;
  radius: number;
}

export function useSessionCreationState() {
  const state = inject<Ref<SessionCreationState>>('session-create-state');
  return state!;
}
</script>

<template>
  <NuxtCard>
    <NuxtStepper ref="stepper" :items="items" class="w-full">
      <template #form>
        <div>
          <div class="h-60 bg-muted">Form</div>
          <div class="flex justify-end">
            <NuxtButton
              trailing-icon="lucide:circle-arrow-right"
              :disabled="!stepper?.hasNext"
              @click="stepper?.next()"
            >
              Next
            </NuxtButton>
          </div>
        </div>
      </template>

      <template #location>
        <div class="space-y-5">
          <div>
            <UserSessionCreateFlowLocationSelector />
          </div>

          <div class="flex justify-between">
            <NuxtButton
              icon="lucide:circle-arrow-left"
              :disabled="!stepper?.hasPrev"
              @click="stepper?.prev()"
            >
              Prev
            </NuxtButton>

            <NuxtButton
              trailing-icon="lucide:circle-arrow-right"
              :disabled="!stepper?.hasNext"
              @click="stepper?.next()"
            >
              Next
            </NuxtButton>
          </div>
        </div>
      </template>
    </NuxtStepper>
  </NuxtCard>
</template>
