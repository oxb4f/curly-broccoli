<script setup>
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import BaseNavigationList from './BaseNavigationList.vue';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

defineProps({
  options: {
    type: Object,
    default: new Object()
  }
});

const isHidden = useStorage('vue-sidebar-options-hidden', true);

const hidingButtonIcon = computed(() => {
  return isHidden.value ? ChevronUpIcon : ChevronDownIcon;
});

function changeVisibility() {
  isHidden.value = !isHidden.value;
}
</script>

<template>
  <div class="options" :class="{ options__hidden: isHidden }">
    <button class="options__hide-button" @click="changeVisibility">
      <component :is="hidingButtonIcon" class="options__hide-icon" />
    </button>
    <BaseNavigationList :list="options" />
  </div>
</template>
