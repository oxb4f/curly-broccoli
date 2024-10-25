<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits({
  imageDraw: (imageData) => {
    return imageData;
  }
});

function drawImage(canvas, image) {
  const context = canvas.getContext('2d');

  const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = canvas.width / 2 - width / 2;
  const y = canvas.height / 2 - height / 2;

  context.drawImage(image, x, y, width, height);

  emit('imageDraw', {
    x,
    y,
    width,
    height,
    crop: (newSize) => {
      cropImage(canvas, image, newSize);
    }
  });
}

onMounted(() => {
  const canvas = document.getElementById('canvas');
  const originalImage = new Image();

  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  originalImage.src = props.imageUrl;
  originalImage.addEventListener('load', () => {
    drawImage(canvas, originalImage);
  });
});

function cropImage(canvas, image, newSize) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
  const width = newSize?.width / scale;
  const height = newSize?.height / scale;
  const x = newSize?.x / scale;
  const y = newSize?.y / scale;

  canvas.width = newSize?.width;
  canvas.height = newSize?.height;

  context.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);

  // canvas.toBlob((blob) => {
  //   let file = new File([blob], 'profilePhoto.jpg', { type: 'image/jpeg' });
  //   console.log(file);
  // }, 'image/jpeg');

  let tempLink = document.createElement('a');

  let fileName = `image-cropped.jpg`;

  tempLink.download = fileName;
  tempLink.href = canvas.toDataURL('image/jpeg', 0.9);

  tempLink.click();
}
</script>

<template>
  <canvas ref="canvasRef" id="canvas"></canvas>
</template>
