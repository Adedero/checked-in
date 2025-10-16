<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';
import {
  registrationSchema,
  type RegistrationSchema
} from '~~/shared/zod-schemas/registration.zod';

export type SignUpPayload = {
  name: string;
  email: string;
};

const emit = defineEmits<{
  signUp: [payload: SignUpPayload];
}>();

const toast = useToast();

const state = ref<Partial<RegistrationSchema>>({});

const reset = () => {
  state.value = {};
};

async function handleSubmit(event: FormSubmitEvent<RegistrationSchema>) {
  const { firstName, lastName, email, password } = event.data;

  const payload = {
    name: `${firstName.trim()} ${lastName.trim()}`,
    email: email.trim(),
    password: password.trim()
  };

  await authClient.signUp.email(payload, {
    onSuccess: () => {
      reset();

      toast.add({
        title: 'Success',
        description: 'You have successfully signed up',
        color: 'success'
      });

      emit('signUp', { name: payload.name, email: payload.email });
    },
    onError: (ctx) => {
      toast.add({
        title: 'Registration Error',
        description: ctx.error.message,
        color: 'error'
      });
    }
  });
}
</script>

<template>
  <NuxtForm :state="state" :schema="registrationSchema" @submit="handleSubmit">
    <div class="grid md:grid-cols-2 gap-4">
      <NuxtFormField name="firstName" label="First Name" required>
        <NuxtInput
          v-model="state.firstName"
          placeholder="First name"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtFormField name="lastName" label="Last Name" required>
        <NuxtInput
          v-model="state.lastName"
          placeholder="Last name"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtFormField
        name="email"
        label="Email Address"
        required
        class="md:col-span-2"
      >
        <NuxtInput
          v-model="state.email"
          placeholder="Email address"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtFormField
        name="password"
        label="Password"
        required
        class="md:col-span-2"
      >
        <NuxtPassword
          v-model="state.password"
          placeholder="Password"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtFormField name="hasAgreedToTerms" class="md:col-span-2">
        <NuxtCheckbox v-model="state.hasAgreedToTerms">
          <template #label>
            <span>
              I agree to the
              <NuxtLink to="/terms-of-use" class="link">
                terms of use
              </NuxtLink>
              and
              <NuxtLink to="/privacy-policy" class="link">
                privacy policy
              </NuxtLink>
            </span>
          </template>
        </NuxtCheckbox>
      </NuxtFormField>

      <div class="md:col-span-2">
        <NuxtButton type="submit" block size="lg" loading-auto>
          Create account
        </NuxtButton>
      </div>
    </div>
  </NuxtForm>
</template>
