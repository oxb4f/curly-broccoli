<script setup>
import { RouterView } from 'vue-router';
import BaseLogo from '../components/BaseLogo.vue';
import BaseMediaContent from '../components/BaseMediaContent.vue';
</script>

<template>
  <section class="authorization">
    <article class="authorization__window">
      <header class="authorization__header"><BaseLogo /></header>
      <main class="authorization__content"><RouterView name="form" /></main>
    </article>
    <BaseMediaContent class="authorization__media-content" />
  </section>
</template>
