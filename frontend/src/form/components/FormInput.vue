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
  />
  <TransitionGroup name="slide"
    ><span v-if="description && !model && !error" class="input__description" key="description">{{
      description
    }}</span>
    <span v-if="error" class="form__error" key="error">{{ error }}</span></TransitionGroup
  >
</template>
