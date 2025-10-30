<script setup lang="ts">
const sessionType = ref<string>();

const items = ref([
  {
    label: 'Single Session',
    description: 'Create a stand-alone session.',
    value: 'single'
  },
  {
    label: 'Group Session',
    description: 'Create a session for a group.',
    value: 'group'
  }
]);

function handleClick() {
  navigateTo('/app/attendance/sessions/create');
}
</script>

<template>
  <div>
    <NuxtModal
      title="New Session"
      description="Create a new attendance session"
    >
      <NuxtButton icon="lucide:plus">New</NuxtButton>

      <template #body="{ close }">
        <div class="space-y-5">
          <div class="flex-center">
            <NuxtRadioGroup
              v-model="sessionType"
              :items
              variant="card"
              orientation="horizontal"
              :ui="{
                fieldset: 'grid grid-cols-2'
              }"
            />
          </div>

          <div v-if="sessionType === 'group'">
            <LazyUserGroupsSelect />
          </div>

          <div class="flex items-center justify-end gap-2">
            <NuxtButton
              color="neutral"
              variant="soft"
              icon="lucide:circle-x"
              @click="close"
            >
              Cancel
            </NuxtButton>
            <NuxtButton
              trailing-icon="lucide:circle-arrow-right"
              @click="handleClick"
            >
              Proceed
            </NuxtButton>
          </div>
        </div>
      </template>
    </NuxtModal>
  </div>
</template>
