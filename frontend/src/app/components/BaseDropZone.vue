<script setup>
import { useDropZone } from '@vueuse/core';
import { ref } from 'vue';

const emit = defineEmits({
  fileDrop: (file) => {
    return file;
  }
});

const file = ref();
const dropZoneRef = ref();

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

function onDrop(files) {
  if (files) {
    file.value = files[0];
    emit('fileDrop', file.value);
  }
}

function onFileChange(event) {
  file.value = event.target.files[0];
  emit('fileDrop', file.value);
}
</script>

<template>
  <div
    ref="dropZoneRef"
    class="drop-zone relative size-full border-4 border-dashed border-project-border-color text-project-border-color"
    :class="{
      '!border-project-text-color !text-project-text-color': isOverDropZone
    }"
  >
    <div class="size-full flex justify-center items-center">
      <input type="file" class="absolute inset-0 opacity-0 z-10" @input="onFileChange" />
      <span>Select or drop files here</span>
    </div>
  </div>
</template>
