<script setup>
import BaseForm from '../components/BaseForm.vue';
import FormItem from '../components/FormItem.vue';
import FormInput from '../components/FormInput.vue';
import { useForm } from '../composables/useForm';
import BaseModal from '@/app/components/BaseModal.vue';
import { createUser } from '@/app/services/api/user';

const { inputs, errors, submitForm, isSubmitDisabled } = useForm({ username: '', password: '' });
</script>

<template>
  <BaseModal>
    <template #content>
      <BaseForm @submit="submitForm(createUser, inputs)">
        <template #header><h1>Реєстрація</h1></template>
        <template #content>
          <!-- <p>{{ inputs.username }}</p> -->
          <FormItem>
            <FormInput
              label="Вкажіть логін:"
              id="username"
              type="text"
              class="form__username-input"
              placeholder="Логін"
              v-model="inputs.username"
              description="*Повинно бути не менше одного символа"
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
              description="*Повинно бути не менше восьми символів"
              :error="errors.password"
            />
          </FormItem>
          <!-- <BaseFormField
            label="Вкажіть логін:"
            id="username"
            type="text"
            class="form__username-input"
            placeholder="Логін"
            v-model="inputs.username"
            :error="errors.username"
          /> -->
          <!-- <FormInputItem
            label="Вкажіть електронну пошту:"
            id="email"
            type="email"
            class="form__email-input"
            placeholder="Ел. пошта"
            error="Помилка"
          /> -->
          <!-- <BaseFormField
            label="Вкажіть пароль:"
            id="password"
            type="password"
            class="form__password-input"
            placeholder="Пароль"
            v-model="inputs.password"
            :error="errors.password"
          /> -->
        </template>
        <template #footer>
          <input
            type="submit"
            value="Зареєструватись"
            class="form__submit-button"
            :disabled="isSubmitDisabled"
          />
        </template>
      </BaseForm>
    </template>
    <template #footer>
      <span>Вже є акаунт? <RouterLink class="link" to="/login">Увійти</RouterLink></span>
    </template>
  </BaseModal>
</template>
