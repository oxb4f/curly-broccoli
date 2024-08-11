<script setup>
import BaseInput from '@/app/components/BaseInput.vue';

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  }
});
</script>

<template>
  <BaseInput :label v-bind="$attrs" class="form__input" />
  <span v-if="error" class="form__error">{{ error }}</span>
</template>
