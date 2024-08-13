<script setup>
import { RouterView } from 'vue-router';
import BaseLogo from '../components/BaseLogo.vue';
</script>

<template>
  <section class="authorisation">
    <article class="authorisation__window">
      <header class="authorisation__header"><BaseLogo /></header>
      <main class="authorisation__content"><RouterView></RouterView></main>
    </article>
    <article class="authorisation__media-content media-content">
      <div class="media-content__showcase">
        <img src="../assets/images/iphone-screen.png" alt="iphone-screen" class="w-44" />
      </div>
      <div class="media-content__content">
        <header class="media-content__header"><h1>Download the application</h1></header>
        <main class="media-content__description description">
          Our app is made for people who want read their favorite books and share their thoughts
          with like-minded people
        </main>
        <footer class="media-content__footer">
          <img
            src="../assets/images/google-play-download.png"
            class="h-10"
            alt="Google Play Download"
          />
          <img
            src="../assets/images/microsoft-download.png"
            class="h-10"
            alt="Microsoft Download"
          />
        </footer>
      </div>
    </article>
  </section>
</template>
