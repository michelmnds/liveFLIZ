import { PixelCrop } from 'react-image-crop';

export function setCanvasPreview(image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // High DPI screens may need an adjustment
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio ?? 1;

  // Make the canvas the exact bounding box of the crop
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  // Ensure we can draw in higher resolution
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // Draw just the cropped area of the source image onto the canvas
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
}
