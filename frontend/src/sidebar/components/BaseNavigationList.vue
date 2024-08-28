<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  list: {
    type: Object,
    default: new Object()
  },
  singleItem: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const currentPath = computed(() => {
  return router.currentRoute.value.path;
});
</script>

<template>
  <ul v-if="!singleItem" class="navigation-list">
    <li
      v-for="bar in list"
      :key="bar"
      class="navigation-list__item"
      :class="{ 'navigation-list__item__current': currentPath === bar.toUrl }"
    >
      <RouterLink :to="bar.toUrl" class="navigation-list__link link"
        ><component :is="bar.icon" class="navigation-list__icon"
      /></RouterLink>
    </li>
  </ul>
  <div
    v-else
    class="navigation-list__item"
    :class="{ 'navigation-list__item__current': currentPath === list.toUrl }"
  >
    <RouterLink :to="list.toUrl" class="navigation-list__link link"
      ><component :is="list.icon" class="navigation-list__icon"
    /></RouterLink>
  </div>
</template>
