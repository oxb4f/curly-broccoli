<script setup>
import BaseLogo from '@/app/components/BaseLogo.vue';
import BaseProfilePhoto from '@/app/components/BaseProfilePhoto.vue';
import useSidebar from '../composables/useSidebar';

const { navigationList, currentPath } = useSidebar();
</script>

<template>
  <nav class="sidebar">
    <header class="sidebar__header"><BaseLogo text="L" class="sidebar__logo" /></header>
    <main class="sidebar__main">
      <ul class="sidebar__list">
        <li
          v-for="bar in navigationList"
          :key="bar"
          class="sidebar__list-item"
          :class="{ 'sidebar__list-item__current': currentPath === bar.toUrl }"
        >
          <RouterLink :to="bar.toUrl" class="sidebar__link link"
            ><component :is="bar.icon" class="sidebar__icon"></component
          ></RouterLink>
        </li>
      </ul>
    </main>
    <footer class="sidebar__footer">
      <button class="sidebar__profile-button">
        <BaseProfilePhoto class="sidebar__profile-photo" />
      </button>
    </footer>
  </nav>
</template>
