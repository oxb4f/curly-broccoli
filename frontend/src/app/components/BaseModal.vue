<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';
import BaseLogo from './BaseLogo.vue';

const router = useRouter();

function close() {
  router.push('../');
}
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__window">
        <header class="modal__header">
          <button @click="close" class="modal__close-button">
            <ChevronLeftIcon class="modal__close-button-icon" />
          </button>
          <div class="modal__logo">
            <BaseLogo />
          </div>
        </header>
        <main class="modal__content"><slot name="content"></slot></main>
        <footer class="modal__footer"><slot name="footer"></slot></footer>
      </div>
    </div>
  </Teleport>
</template>
