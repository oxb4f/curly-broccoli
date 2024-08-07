<script setup>
import BasicForm from '../components/BasicForm.vue';
import FormInputItem from '../components/FormInputItem.vue';
import ModalWindow from '../components/ModalWindow.vue';
</script>

<template>
  <ModalWindow>
    <template #content>
      <BasicForm>
        <template #header><h1>Реєстрація</h1></template>
        <p>{{ form.username }}</p>
        <template #content>
          <FormInputItem
            field-id="username"
            field-type="text"
            field-class="form__username-field"
            field-placeholder="Ваше ім'я"
            error="Помилка"
            >Вкажіть ім'я:</FormInputItem
          >
          <FormInputItem
            field-id="email"
            field-type="email"
            field-class="form__email-field"
            field-placeholder="Ел. пошта"
            error="Помилка"
            >Вкажіть електронну пошту:</FormInputItem
          >
          <FormInputItem
            field-id="password"
            field-type="password"
            field-class="form__password-field"
            field-placeholder="Пароль"
            error="Помилка"
            >Вкажіть пароль:</FormInputItem
          >
        </template>
        <template #footer>
          <input type="submit" value="Зареєструватись" class="form__submit-button" />
        </template>
      </BasicForm>
    </template>
    <template #footer>
      <span>Вже є акаунт? <RouterLink class="link" to="/login">Увійти</RouterLink></span>
    </template>
  </ModalWindow>
</template>
