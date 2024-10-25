export default function useCropImage(canvas, image, newSizes) {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width / image.width, canvas.height / image.height);

  const width = newSizes?.scale / scale;
  const height = newSizes?.scale / scale;
  const x = newSizes?.xRelativeToImage / scale;
  const y = newSizes?.yRelativeToImage / scale;

  canvas.width = newSizes?.scale;
  canvas.height = newSizes?.scale;

  context.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);

  let tempLink = document.createElement('a');

  let fileName = `image-cropped.jpg`;

  tempLink.download = fileName;
  tempLink.href = canvas.toDataURL('image/jpeg', 0.9);

  tempLink.click();

  canvas.toBlob((blob) => {
    let file = new File([blob], 'profilePhoto.jpg', { type: 'image/jpeg' });
    console.log(file);
  }, 'image/jpeg');
}
