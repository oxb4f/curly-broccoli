<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function close() {
  router.go(-1);
}
</script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__backdrop" @click="close"></div>
      <div class="modal__window">
        <header class="modal__header">
          <slot name="header"></slot>
        </header>
        <main class="modal__content"><slot name="content"></slot></main>
        <footer class="modal__footer"><slot name="footer"></slot></footer>
      </div>
    </div>
  </Teleport>
</template>
