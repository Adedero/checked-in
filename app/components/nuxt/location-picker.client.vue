<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import * as L from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';

import markerIcon2x from '~/assets/leaflet/leaflet-marker-icon-2x.png';
import markerIcon from '~/assets/leaflet/leaflet-marker-icon.png';
import markerShadow from '~/assets/leaflet/leaflet-marker-shadow.png';

const { height = '350px' } = defineProps<{ height?: string }>();

const lat = defineModel<number>('lat', { default: 0 });
const lng = defineModel<number>('lng', { default: 0 });
const name = defineModel<string>('name', { default: '' });
const radius = defineModel<number>('radius', { default: 0 });

const target = useTemplateRef('target');
const map = ref<L.Map>();
const markerLayer = ref<L.LayerGroup | null>(null);
const circleLayer = ref<L.Circle | null>(null);
const zoomLevel = ref(18);

/**
 * Clears all markers and circles
 */
function clearMapMarkers() {
  if (markerLayer.value) {
    markerLayer.value.clearLayers();
  }
  if (circleLayer.value) {
    circleLayer.value.remove();
    circleLayer.value = null;
  }
}

/**
 * Updates marker position and popup
 */
function updateMarker() {
  if (!map.value || !markerLayer.value) return;
  if (!lat.value || !lng.value) return;

  clearMapMarkers();

  const marker = L.marker([lat.value, lng.value]).bindPopup(
    name.value || 'Location'
  );
  markerLayer.value.addLayer(marker);
  marker.openPopup();

  // Pan to new location
  map.value.setView([lat.value, lng.value], map.value.getZoom());
}

/**
 * Updates the circular radius around the marker
 */
function updateRadius() {
  if (!map.value || !lat.value || !lng.value) return;

  // Always remove the old circle first
  if (circleLayer.value) {
    circleLayer.value.remove();
    circleLayer.value = null;
  }

  // Don't draw a new one if radius is 0
  if (radius.value <= 0) return;

  // Add new circle
  circleLayer.value = L.circle([lat.value, lng.value], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: radius.value
  }).addTo(map.value);
}

/**
 * Handles user clicking on map or search
 */
async function handleLocationSelect(newLat: number, newLng: number) {
  const { data } = await getReverseGeolocation(newLat, newLng);

  // Update models - this will trigger watchers
  lat.value = newLat;
  lng.value = newLng;
  name.value = data || 'Selected location';
}

// Watch for external changes to lat/lng
watch([lat, lng, name], () => {
  handleLocationSelect(lat.value, lng.value);
  updateMarker();
  updateRadius();
});

// Watch for radius changes
watch(radius, () => {
  updateRadius();
});

onMounted(async () => {
  await nextTick();
  if (!target.value) return;

  // Fix for missing default icons in Vite
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
  });

  // Get initial position if models are empty
  if (!lat.value && !lng.value) {
    const { data: latlng } = await getLatLng();
    lat.value = latlng?.lat || 0;
    lng.value = latlng?.lng || 0;

    const { data: currentLocation } = await getReverseGeolocation(
      lat.value,
      lng.value
    );
    name.value = currentLocation || 'Current location';
  }

  // Initialize map
  map.value = L.map(target.value).setView(
    [lat.value, lng.value],
    zoomLevel.value
  );

  // Create a dedicated layer group for markers
  markerLayer.value = L.layerGroup().addTo(map.value);

  // Add base tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  // Handle clicks
  map.value.on('click', (e) =>
    handleLocationSelect(e.latlng.lat, e.latlng.lng)
  );

  // Initial marker and radius
  updateMarker();
  updateRadius();

  // Add geocoder control
  new Geocoder({
    defaultMarkGeocode: false
  })
    .on('markgeocode', (e) => {
      const { lat: newLat, lng: newLng } = e.geocode.center;
      map.value!.setView([newLat, newLng], zoomLevel.value);
      handleLocationSelect(newLat, newLng);
    })
    .addTo(map.value);
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<template>
  <div>
    <div
      ref="target"
      class="w-full rounded-md overflow-hidden"
      :style="{ height }"
    />
  </div>
</template>
