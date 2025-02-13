import './Canvas.css';
import { useEffect, useRef, memo, useImperativeHandle } from 'react';

const Canvas = memo(({ innerRef, imageUrl, onImageLoad, className = '', ...props }) => {
  const canvasRef = useRef(null);
  const image = useRef(new Image());

  const getImageBounds = () => {
    return { ...image.current.bounds };
  };

  const getCanvas = () => {
    return canvasRef.current;
  };

  const syncCanvasSize = (canvas, width, height, measure) => {
    canvas.style.width = width + measure;
    canvas.style.height = height + measure;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const drawImage = (canvas, image) => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);

    const width = image.width * scale;
    const height = image.height * scale;

    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    image.bounds = { width, height, left: x, top: y };
    context.drawImage(image, x, y, width, height);
  };

  const cropImage = (canvas, image, cropParams) => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);

    const width = cropParams.size / scale;
    const height = cropParams.size / scale;

    const x = cropParams.x / scale;
    const y = cropParams.y / scale;

    syncCanvasSize(canvas, cropParams.size, cropParams.size, 'px');

    context.drawImage(image, x, y, width, height, 0, 0, cropParams.size, cropParams.size);
  };

  useImperativeHandle(innerRef, () => ({
    getImageUrl: getCanvas,
    cropImage: (cropParams) => {
      return cropImage(canvasRef.current, image.current, cropParams);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const originalImage = image.current;

    syncCanvasSize(canvas, 100, 100, '%');

    const handleImageLoad = () => {
      drawImage(canvas, originalImage);
      onImageLoad(getImageBounds());
    };

    originalImage.src = imageUrl;
    originalImage.addEventListener('load', handleImageLoad);

    return () => {
      originalImage.removeEventListener('load', handleImageLoad);
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} className={`canvas ${className}`} {...props}></canvas>;
});

Canvas.displayName = 'Canvas';

export default Canvas;
