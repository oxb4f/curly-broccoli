<script setup></script>

<template>
  <form @submit.prevent class="form">
    <header class="form__header">
      <slot name="header"></slot>
    </header>
    <main class="form__content">
      <slot name="content"></slot>
    </main>
    <footer class="form__footer">
      <slot name="footer"></slot>
    </footer>
  </form>
</template>
