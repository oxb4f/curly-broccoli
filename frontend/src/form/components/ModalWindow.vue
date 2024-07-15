<script setup></script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__background"></div>
      <div class="modal__content"><slot></slot></div>
    </div>
  </Teleport>
</template>
