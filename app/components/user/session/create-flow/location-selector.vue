<script setup lang="ts">
import { useSessionCreationState } from './index.vue';

const toast = useToast();
const state = useSessionCreationState();

const items = ref([
  {
    label: 'Open',
    description: 'Anyone anywhere can check in.',
    value: false
  },
  {
    label: 'Restricted',
    description: 'Restrict check in to a specific location.',
    value: true
  }
]);

async function useCurrentLocation() {
  const { data: latlng, error } = await getLatLng();

  if (!latlng || error) {
    toast.add({
      title: 'Error',
      description: error.message || 'Failed to get current location.',
      color: 'error'
    });
    return;
  }

  state.value.lat = latlng.lat;
  state.value.lng = latlng.lng;
  toast.add({ description: 'Current location selected.' });
}
</script>

<template>
  <div class="space-y-10">
    <!-- <header>
      <p class="font-semibold">Focus Point</p>
    </header> -->

    <div class="flex-center">
      <NuxtRadioGroup
        v-model="state.isRestricted"
        :items
        variant="card"
        orientation="horizontal"
        :ui="{
          fieldset: 'grid sm:grid-cols-2'
        }"
      />
    </div>

    <div v-if="state.isRestricted" class="space-y-6">
      .
      <div class="flex-col-center text-center">
        <p class="font-bold">Focus Point:</p>
        <p class="max-w-96 text-balance">{{ state.focusPointName }}</p>
      </div>

      <div class="space-y-5">
        <div class="flex-col-center gap-1">
          <p>Radius</p>
          <NuxtInputNumber
            v-model="state.radius"
            orientation="vertical"
            :step="50"
            :min="50"
            :max="1000"
          />
        </div>

        <NuxtSlider v-model="state.radius" :min="0" :max="1000" :step="50" />
      </div>

      <div
        class="flex flex-col md:flex-row items-center md:items-end justify-end md:justify-between gap-x-2 gap-y-4"
      >
        <div class="flex flex-col md:flex-row items-end gap-2">
          <NuxtFormField label="Latitude">
            <NuxtInputNumber
              v-model="state.lat"
              placeholder="Latitude"
              :min="-90"
              :max="90"
              :step-snapping="false"
              orientation="vertical"
              :format-options="{
                minimumFractionDigits: 7,
                maximumFractionDigits: 7
              }"
            />
          </NuxtFormField>

          <NuxtFormField label="Longitude">
            <NuxtInputNumber
              v-model="state.lng"
              placeholder="Longittude"
              :min="-180"
              :max="180"
              :step-snapping="false"
              orientation="vertical"
              :format-options="{
                minimumFractionDigits: 7,
                maximumFractionDigits: 7
              }"
            />
          </NuxtFormField>
        </div>

        <NuxtSeparator class="md:hidden" />

        <NuxtButton
          color="neutral"
          variant="soft"
          icon="lucide:map-pin-check"
          @click="useCurrentLocation"
        >
          Use Current Location
        </NuxtButton>
      </div>

      <NuxtLocationPicker
        v-model:lat="state.lat"
        v-model:lng="state.lng"
        v-model:name="state.focusPointName"
        v-model:radius="state.radius"
      />
    </div>
  </div>
</template>
