<script setup>
import { reactive } from 'vue';
import BaseProfilePhoto from '../components/BaseProfilePhoto.vue';

const profileInfo = reactive({
  booksRead: {
    count: 0,
    label: 'books read'
  },
  followers: {
    count: 0,
    label: 'followers'
  },
  following: {
    count: 0,
    label: 'following'
  }
});
</script>

<template>
  <section class="user-profile">
    <header class="user-profile__header">
      <section class="user-profile__window">
        <div class="user-profile__info">
          <BaseProfilePhoto class="user-profile__photo" />
          <div class="user-profile__username">eledjent</div>
        </div>
      </section>
      <section class="user-profile__stats user-stats">
        <article v-for="stat in profileInfo" :key="stat" class="user-stats__item">
          <div class="user-stats__item-counter">{{ stat.count }}</div>
          <div class="user-stats__item-name">{{ stat.label }}</div>
        </article>
      </section>
    </header>

    <main class="user-profile__content">
      <header class="authorization__header"><BaseLogo /></header>
      <main class="authorization__content"><RouterView name="form" /></main>
    </main>
  </section>
</template>
