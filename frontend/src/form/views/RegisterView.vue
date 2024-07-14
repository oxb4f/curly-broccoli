<script setup>
import BasicForm from '../components/BasicForm.vue'
import FormItem from '../components/FormItem.vue'
import ModalWindow from '../components/ModalWindow.vue'
</script>

<template>
  <ModalWindow>
    <BasicForm>
      <template #header><h1>Реєстрація</h1></template>
      <template #content>
        <FormItem
          field-id="nickname"
          field-type="text"
          field-class="form__nickname-field"
          field-placeholder="Ваше ім'я"
          error="Помилка"
          >Вкажіть ім'я:</FormItem
        >
        <FormItem
          field-id="email"
          field-type="email"
          field-class="form__email-field"
          field-placeholder="Ел. пошта"
          error="Помилка"
          >Вкажіть електронну пошту:</FormItem
        >
        <FormItem
          field-id="password"
          field-type="password"
          field-class="form__password-field"
          field-placeholder="Пароль"
          error="Помилка"
          >Вкажіть пароль:</FormItem
        >
      </template>
      <template #footer>
        <input type="submit" value="Зареєструватись" class="form__submit-button" />
        <span>Вже є акаунт? <RouterLink to="/login">Увійти</RouterLink></span>
      </template>
    </BasicForm>
  </ModalWindow>
</template>
