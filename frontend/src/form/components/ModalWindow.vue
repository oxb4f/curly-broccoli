<script setup>
import { AcademicCapIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useRouter } from 'vue-router';

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
        <div class="modal__header">
          <button @click="close" class="modal__close-button">
            <ChevronLeftIcon class="modal__close-button-icon" />
          </button>
          <div class="modal__logo"><AcademicCapIcon class="modal__logo-icon logo-icon" /></div>
        </div>
        <div class="modal__content"><slot name="content"></slot></div>
        <div class="modal__footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </Teleport>
</template>
