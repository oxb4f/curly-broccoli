<script setup>
import { RouterView } from 'vue-router';
import BaseLogo from '../components/BaseLogo.vue';
import BaseMediaContent from '../components/BaseMediaContent.vue';
</script>

<template>
  <section class="authorisation">
    <article class="authorisation__window">
      <header class="authorisation__header"><BaseLogo /></header>
      <main class="authorisation__content"><RouterView></RouterView></main>
    </article>
    <BaseMediaContent class="authorisation__media-content" />
  </section>
</template>
