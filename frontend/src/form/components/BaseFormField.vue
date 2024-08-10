<script setup>
defineOptions({
  inheritAttrs: false
});

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

const model = defineModel({ type: String });
</script>

<template>
  <div class="form__item">
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <input class="form__field" v-bind="$attrs" v-model="model" />
    <span v-if="error" class="form__error">{{ error }}</span>
  </div>
</template>
