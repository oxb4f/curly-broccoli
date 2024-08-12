<script setup>
import BaseForm from '@form/components/BaseForm.vue';
import FormItem from '@form/components/FormItem.vue';
import FormInput from '@form/components/FormInput.vue';
import { useForm } from '@form/composables/useForm';
import BaseModal from '@app/components/BaseModal.vue';

const { inputs, errors } = useForm({ username: '', password: '' });
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm>
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
            <span><RouterLink class="link" to="/">Forgot password?</RouterLink></span>
          </FormItem>
        </template>
        <template #footer>
          <input type="submit" value="Login" class="form__submit-button" /> </template
      ></BaseForm>
    </template>
    <template #footer>
      <span
        >First time here? <RouterLink class="link" to="/register">Register</RouterLink></span
      ></template
    >
  </BaseModal>
</template>
