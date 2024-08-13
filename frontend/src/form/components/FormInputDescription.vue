<script setup>
defineProps({
  description: {
    type: [String, Boolean],
    default: false
  }
});
</script>

<template>
  <span class="input__description description">{{ description }}</span>
</template>
