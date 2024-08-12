<script setup>
import BaseInput from '@/app/components/BaseInput.vue';

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  description: {
    type: [String, Boolean],
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  }
});

const model = defineModel({ type: String });
</script>

<template>
  <BaseInput
    :label
    :description="!error ? description : undefined"
    v-bind="$attrs"
    v-model="model"
    class="form__input"
    :class="error ? 'error' : undefined"
  />
  <TransitionGroup name="slide"
    ><span
      v-if="description && !model && !error"
      class="input__description description"
      key="description"
      >{{ description }}</span
    >
    <span v-if="error" class="input__error error" key="error">{{ error }}</span></TransitionGroup
  >
</template>
