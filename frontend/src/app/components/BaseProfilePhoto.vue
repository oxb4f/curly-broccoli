<script setup>
import { ref } from 'vue';

const profileImage = ref('src/app/assets/images/profile-photo.jpg');
</script>

<template>
  <div class="profile-photo">
    <div class="profile-photo__container">
      <img :src="profileImage" alt="Profile image" class="profile-photo__image" />
    </div>
  </div>
</template>
