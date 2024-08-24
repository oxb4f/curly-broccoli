<script setup>
import { ref } from 'vue';
import BaseProfilePhoto from '@/app/components/BaseProfilePhoto.vue';

const username = ref('eledjent');
</script>

<template>
  <div class="user-profile">
    <BaseProfilePhoto />
    <span class="user-profile__username">{{ username }}</span>
  </div>
</template>
