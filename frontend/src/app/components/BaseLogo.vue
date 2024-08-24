<script setup>
defineProps({
  text: {
    type: String,
    default: 'Litrify'
  }
});
</script>

<template>
  <span class="logo-icon">{{ text }}</span>
</template>
