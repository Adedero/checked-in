<template>
  <div>
    <div class="pt-36 pb-80">
      <div class="flex flex-col gap-y-2 items-center justify-center px-5">
        <NuxtBadge
          label="Online Attendance System"
          color="secondary"
          variant="subtle"
        />

        <h1 class="font-bold text-7xl text-center">
          Attendance tracking <br />
          made simple.
        </h1>

        <p class="mt-2 text-muted text-center md:max-w-3xl text-balance">
          CheckIn streamlines attendance management for schools, businesses, and
          events. Track attendance in real-time, generate reports instantly, and
          say goodbye to manual roll calls.
        </p>

        <div class="mt-6 flex items-center justify-center gap-2">
          <NuxtButton
            icon="lucide:circle-plus"
            size="lg"
            color="neutral"
            variant="soft"
            to="/sign-up"
          >
            Create an Account
          </NuxtButton>
          <NuxtButton icon="lucide:circle-check-big" size="lg">
            Mark Attendance
          </NuxtButton>
        </div>
      </div>
    </div>

    <div class="bg-muted h-[34rem] relative">
      <div
        class="bg-default rounded-xl border border-default w-[70%] h-[40rem] mx-auto shadow-lg -translate-y-54 overflow-hidden"
      >
        <!-- Image goes here -->
      </div>
    </div>
  </div>
</template>
