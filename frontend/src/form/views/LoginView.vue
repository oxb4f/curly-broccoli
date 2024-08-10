<script setup>
import BaseForm from '../components/BaseForm.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseModal from '../components/BaseModal.vue';
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm>
        <template #header><h1>Вхід</h1></template>
        <template #content>
          <BaseInput
            label="Вкажіть електронну пошту:"
            id="loginEmail"
            type="email"
            class="form__email-field"
            placeholder="Ел. пошта"
            error="Помилка"
          />
          <BaseInput
            label="Вкажіть пароль:"
            id="loginPassword"
            type="password"
            class="form__password-field"
            placeholder="Пароль"
            error="Помилка"
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
