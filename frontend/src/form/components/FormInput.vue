<script setup>
import BaseInput from '@/app/components/BaseInput.vue';
import FormInputError from './FormInputError.vue';
import FormInputDescription from './FormInputDescription.vue';
import { computed } from 'vue';

const props = defineProps({
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

const inscriptionBelow = computed(() => {
  if (props.error) return FormInputError;
  if (props.description && !model.value) return FormInputDescription;
  return undefined;
});
</script>

<template>
  <BaseInput :label v-bind="$attrs" v-model="model" class="form__input" :class="{ error }" />
  <Transition name="slide" mode="out-in">
    <component :is="inscriptionBelow" :description :error></component
  ></Transition>
</template>
