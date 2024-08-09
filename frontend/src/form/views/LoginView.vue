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
            label="Вкажіть електронну пошту:"
            id="loginEmail"
            type="email"
            class="form__email-field"
            placeholder="Ел. пошта"
            error="Помилка"
          />
          <FormInputItem
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
      ></BasicForm>
    </template>
    <template #footer>
      <span
        >Вперше на сайті? <RouterLink class="link" to="/register">Зареєструватись</RouterLink></span
      ></template
    >
  </ModalWindow>
</template>
