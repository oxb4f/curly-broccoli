<script setup></script>

<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__background"></div>
      <div class="modal__window">
        <div class="modal__header">
          <button class="modal__close-button">X</button>
          <div class="modal__logo"><img class="logo" src="" alt="logo" /></div>
        </div>
        <div class="modal__content"><slot name="content"></slot></div>
        <div class="modal__footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </Teleport>
</template>
