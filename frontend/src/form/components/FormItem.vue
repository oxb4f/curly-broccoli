<script setup>
defineProps({
  fieldId: String,
  fieldType: String,
  fieldClass: String,
  fieldPlaceholder: String,
  error: String
})
</script>

<template>
  <div class="form__item">
    <label :for="fieldId"><slot></slot></label>
    <input :id="fieldId" :type="fieldType" :class="fieldClass" :placeholder="fieldPlaceholder" />
    <span class="form__error">{{ error }}</span>
  </div>
</template>
