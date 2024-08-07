<script setup>
import BasicForm from '../components/BasicForm.vue';
import FormInputItem from '../components/FormInputItem.vue';
import ModalWindow from '../components/ModalWindow.vue';
</script>

<template>
  <ModalWindow>
    <template #content>
      <BasicForm>
        <template #header><h1>Вхід</h1></template>
        <template #content>
          <FormInputItem
            field-id="loginEmail"
            field-type="email"
            field-class="form__email-field"
            field-placeholder="Ел. пошта"
            field-value=""
            error="Помилка"
            >Вкажіть електронну пошту:</FormInputItem
          >
          <FormInputItem
            field-id="loginPassword"
            field-type="password"
            field-class="form__password-field"
            field-placeholder="Пароль"
            field-value=""
            error="Помилка"
            >Вкажіть пароль:</FormInputItem
          >
        </template>
        <template #footer>
          <input type="submit" value="Увійти" class="form__submit-button" /> </template
      ></BasicForm>
    </template>
    <template #footer>
      <span
        >Вперше на сайті? <RouterLink class="link" to="/register">Зареєструватись</RouterLink></span
      ></template
    >
  </ModalWindow>
</template>
