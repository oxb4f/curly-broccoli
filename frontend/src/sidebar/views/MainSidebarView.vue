<script setup>
import BaseSidebar from '../components/BaseSidebar.vue';
import BaseLogo from '@/app/components/BaseLogo.vue';
import BaseNavigationList from '../components/SidebarNavigationList.vue';
import SidebarOptionsList from '../components/SidebarOptionsList.vue';
import BaseProfilePhoto from '@/app/components/BaseProfilePhoto.vue';
import {
  HomeIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/vue/24/outline';

const navigationList = {
  roots: {
    home: {
      icon: HomeIcon,
      toUrl: '/main'
    },
    books: {
      icon: BookOpenIcon,
      toUrl: '/books'
    },
    search: {
      icon: MagnifyingGlassIcon,
      toUrl: '/search'
    }
  },
  options: {
    settings: {
      icon: Cog8ToothIcon,
      toUrl: '/settings'
    },
    logout: {
      icon: ArrowLeftStartOnRectangleIcon,
      toUrl: ''
    }
  },
  profile: {
    icon: BaseProfilePhoto,
    toUrl: '/profile'
  }
};
</script>

<template>
  <BaseSidebar>
    <template #header><BaseLogo text="L" class="sidebar__logo" /></template>
    <template #main>
      <BaseNavigationList :list="navigationList.roots" class="sidebar__roots" />
    </template>
    <template #footer>
      <SidebarOptionsList :options="navigationList.options" class="sidebar__options" />
      <BaseNavigationList :list="navigationList.profile" class="sidebar__user-profile" isSingle />
    </template>
  </BaseSidebar>
</template>
