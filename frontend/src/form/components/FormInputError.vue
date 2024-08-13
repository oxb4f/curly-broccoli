<script setup>
defineProps({
  error: {
    type: [String, Boolean],
    default: false
  }
});
</script>

<template>
  <span class="input__error error">{{ error }}</span>
</template>
