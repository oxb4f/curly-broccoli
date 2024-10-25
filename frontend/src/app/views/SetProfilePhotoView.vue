<script setup>
import BaseModal from '../components/BaseModal.vue';
import { useBase64, useDraggable } from '@vueuse/core';
import { computed, ref } from 'vue';
import { XMarkIcon, CheckIcon, ArrowsPointingOutIcon } from '@heroicons/vue/20/solid';
import BaseCanvas from '../components/BaseCanvas.vue';
import BaseDropZone from '@/app/components/BaseDropZone.vue';
import BaseRange from '../components/BaseRange.vue';

const file = ref();
const image = ref();

let { base64: imageUrl } = useBase64(file);

const photoFrameRef = ref();
const photoContainerRef = ref();

const { x, y } = useDraggable(photoFrameRef, {
  preventDefault: true,
  containerElement: photoContainerRef
});

const photoFrame = computed(() => {
  const newSize = Math.min(scaleRange.value, image.value?.height, image.value?.width);
  const newX = Math.min(
    Math.max(image.value?.x, x.value),
    image.value?.width + image.value?.x - newSize
  );
  const newY = Math.min(
    Math.max(image.value?.y, y.value),
    image.value?.height + image.value?.y - newSize
  );

  return {
    size: newSize,
    x: newX,
    y: newY,
    xRelativeToImage: newX - image.value?.x,
    yRelativeToImage: newY - image.value?.y
  };
});

const MIN_FRAME_SCALE = 100;

const scaleRange = ref(MIN_FRAME_SCALE);

function clearImageUrl() {
  imageUrl.value = null;
}
</script>

<template>
  <BaseModal>
    <template #header>
      <div v-if="imageUrl" class="modal__confirm-panel">
        <button @click="clearImageUrl" class="modal__cancel-button modal__button">
          <XMarkIcon class="modal__button-icon" />
        </button>
        <button
          @click="
            () =>
              image.crop({
                x: photoFrame.xRelativeToImage,
                y: photoFrame.yRelativeToImage,
                width: photoFrame.size,
                height: photoFrame.size
              })
          "
          class="modal__confirm-button modal__button"
        >
          <CheckIcon class="modal__button-icon" />
        </button>
      </div>
    </template>
    <template #content>
      <div class="setting-profile-photo">
        <BaseDropZone
          class="setting-profile-photo__drop-zone"
          v-if="!imageUrl"
          v-on:file-drop="file = $event"
        />
        <div v-else ref="photoContainerRef" class="setting-profile-photo__container">
          <BaseCanvas
            class="setting-profile-photo__canvas"
            :image-url="imageUrl"
            v-on:image-draw="image = $event"
          />
          <div
            ref="photoFrameRef"
            class="setting-profile-photo__frame"
            :style="{
              top: `${photoFrame.y}px`,
              left: `${photoFrame.x}px`,
              height: `${photoFrame.size}px`,
              width: `${photoFrame.size}px`
            }"
          >
            <ArrowsPointingOutIcon class="setting-profile-photo__icon" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseRange
        v-if="imageUrl"
        type="range"
        class="modal__range"
        :min="MIN_FRAME_SCALE"
        :max="Math.min(image?.width, image?.height)"
        step="1"
        v-model="scaleRange"
      />
    </template>
  </BaseModal>
</template>
