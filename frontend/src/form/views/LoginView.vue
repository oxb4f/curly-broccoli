<script setup>
import BasicForm from '../components/BasicForm.vue'
import FormItem from '../components/FormItem.vue'
import ModalWindow from '../components/ModalWindow.vue'
</script>

<template>
  <ModalWindow>
    <BasicForm>
      <template #header><h1>Вхід</h1></template>
      <template #content>
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
        <input type="submit" value="Увійти" class="form__submit-button" />
        <span>Вперше на сайті? <RouterLink to="/register">Зареєструватись</RouterLink></span>
      </template></BasicForm
    >
  </ModalWindow>
</template>
