<script setup></script>

<template>
  <div class="form">
    <div class="form__header">
      <slot name="header"></slot>
      <button class="form__close-button"></button>
    </div>
    <div class="form__content">
      <slot name="content"></slot>
    </div>
    <div class="form__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
