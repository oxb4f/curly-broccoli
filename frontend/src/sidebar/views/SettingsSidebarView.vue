<script setup>
import BaseSidebar from '../components/BaseSidebar.vue';
import BaseNavigationList from './BaseNavigationList.vue';

const settingsList = {
  profile: {
    icon: 'Profile settings',
    toUrl: '/settings/profile'
  }
};
</script>

<template>
  <BaseSidebar>
    <template #main>
      <BaseNavigationList :list="settingsList" class="sidebar__roots" />
    </template>
  </BaseSidebar>
</template>
