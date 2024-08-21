<script setup>
import BaseForm from '../components/BaseForm.vue';
import FormItem from '../components/FormItem.vue';
import FormInput from '../components/FormInput.vue';
import FormSubmitButton from '../components/FormSubmitButton.vue';
import useForm from '../composables/useForm';
import { loginUser } from '@/app/services/api/user';

const { inputs, errors, submitForm, isSubmitDisabled } = useForm({ username: '', password: '' });
</script>

<template>
  <BaseForm @submit="submitForm(loginUser, inputs)">
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
          :error="errors.password"
        />
      </FormItem>
    </template>
    <template #footer>
      <FormSubmitButton value="Login" :disabled="isSubmitDisabled" />
      <span>First time here? <RouterLink class="link" to="/">Register</RouterLink></span></template
    >
  </BaseForm>
</template>
