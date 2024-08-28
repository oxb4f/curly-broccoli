<script setup>
defineProps({
  list: {
    type: Object,
    default: new Object()
  },
  isSingle: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <ul v-if="!isSingle" class="navigation navigation-list">
    <li v-for="bar in list" :key="bar" class="navigation-list__item">
      <RouterLink
        :to="bar.toUrl"
        class="navigation__link link"
        exact-active-class="navigation__link__active"
        ><component :is="bar.icon" class="navigation__icon"
      /></RouterLink>
    </li>
  </ul>
  <div v-else class="navigation">
    <RouterLink
      :to="list.toUrl"
      class="navigation__link link"
      exact-active-class="navigation__link__active"
      ><component :is="list.icon" class="navigation__icon"
    /></RouterLink>
  </div>
</template>
