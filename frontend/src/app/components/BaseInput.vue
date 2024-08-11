<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  description: {
    type: [String, Boolean],
    default: false
  }
});

const model = defineModel({ type: String });
</script>

<template>
  <label v-if="label" :for="$attrs.id">{{ label }}</label>
  <input class="input" v-bind="$attrs" v-model="model" />
  <span v-if="description && !model" class="input__description">{{ description }}</span>
</template>
