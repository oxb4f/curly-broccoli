<script setup>
import BaseForm from '@form/components/BaseForm.vue';
import BaseFormField from '@form/components/BaseFormField.vue';
import BaseModal from '@form/components/BaseModal.vue';
import { useForm } from '@form/composables/useForm';

const { fields, errors, clearErrors } = useForm({ username: '', password: '' });
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm>
        <template #header><h1>Вхід</h1></template>
        <template #content>
          <BaseFormField
            label="Вкажіть логін:"
            id="username"
            type="text"
            class="form__username-field"
            placeholder="Логін"
            v-model="fields.username"
            :error="errors.username"
          />
          <BaseFormField
            label="Вкажіть пароль:"
            id="password"
            type="password"
            class="form__password-field"
            placeholder="Пароль"
            v-model="fields.password"
            :error="errors.password"
          />
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
