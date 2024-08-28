<script setup></script>

<template>
  <nav class="sidebar">
    <header class="sidebar__header"><slot name="header"></slot></header>
    <main class="sidebar__main">
      <slot name="main"></slot>
    </main>
    <footer class="sidebar__footer">
      <slot name="footer"></slot>
    </footer>
  </nav>
</template>
