<script setup>
import BaseForm from '../components/BaseForm.vue';
import FormItem from '../components/FormItem.vue';
import FormInput from '../components/FormInput.vue';
import FormSubmitButton from '../components/FormSubmitButton.vue';
import { useForm } from '../composables/useForm';
import { createUser } from '@/app/services/api/user';

const { inputs, errors, submitForm, isSubmitDisabled } = useForm({ username: '', password: '' });
</script>

<template>
  <BaseForm @submit="submitForm(createUser, inputs)">
    <template #content>
      <FormItem>
        <FormInput
          id="username"
          type="text"
          class="form__username-input"
          placeholder="Login"
          v-model="inputs.username"
          :error="errors.username"
        />
      </FormItem>
      <FormItem>
        <FormInput
          id="password"
          type="password"
          class="form__password-input"
          placeholder="Password"
          v-model="inputs.password"
          description="*Minimum 8 characters"
          :error="errors.password"
        />
      </FormItem>
    </template>
    <template #footer>
      <FormSubmitButton value="Register" :disabled="isSubmitDisabled" />
      <span
        >Already have an account? <RouterLink class="link" to="/login">Login</RouterLink></span
      ></template
    >
  </BaseForm>
</template>
