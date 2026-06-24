/**
 * Compresses a base64 image string by resizing it to a maximum width
 * and converting it to a compressed JPEG format.
 * 
 * @param {string} base64Str - The source base64 image string (data:image/...)
 * @param {number} maxWidth - The maximum width of the output image (default: 1000)
 * @param {number} quality - The JPEG quality from 0 to 1 (default: 0.7)
 * @returns {Promise<string>} A promise that resolves to the compressed base64 JPEG string
 */
export const compressBase64Image = (base64Str, maxWidth = 1000, quality = 0.7) => {
  return new Promise((resolve) => {
    // If it's not a valid base64 image string, return it as-is
    if (!base64Str || typeof base64Str !== 'string' || !base64Str.startsWith('data:image/')) {
      return resolve(base64Str);
    }

    // Do not compress SVGs or very small images (less than 50KB)
    if (base64Str.length < 50 * 1024 || base64Str.includes('image/svg+xml')) {
      return resolve(base64Str);
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(base64Str); // Fallback if canvas context is not supported
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG base64 with quality parameter
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Only return compressed version if it is actually smaller than original
        if (compressedDataUrl.length < base64Str.length) {
          resolve(compressedDataUrl);
        } else {
          resolve(base64Str);
        }
      } catch (err) {
        console.error('[IMAGE_COMPRESSOR] Compression failed, falling back to original:', err);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};
