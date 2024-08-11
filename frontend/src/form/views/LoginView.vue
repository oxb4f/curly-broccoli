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
        <template #header><h1>Вхід</h1></template>
        <template #content>
          <FormItem>
            <FormInput
              label="Вкажіть логін:"
              id="username"
              type="text"
              class="form__username-input"
              placeholder="Логін"
              v-model="inputs.username"
              :error="errors.username"
            />
          </FormItem>
          <FormItem>
            <FormInput
              label="Вкажіть пароль:"
              id="password"
              type="password"
              class="form__password-input"
              placeholder="Пароль"
              v-model="inputs.password"
              :error="errors.password"
            />
            <span><RouterLink class="link" to="/">Забули пароль?</RouterLink></span>
          </FormItem>
        </template>
        <template #footer>
          <input type="submit" value="Увійти" class="form__submit-button" /> </template
      ></BaseForm>
    </template>
    <template #footer>
      <span
        >Вперше на сайті? <RouterLink class="link" to="/register">Зареєструватись</RouterLink></span
      ></template
    >
  </BaseModal>
</template>
