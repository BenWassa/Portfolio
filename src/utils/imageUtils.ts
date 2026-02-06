/**
 * Image optimization utilities for responsive loading
 */

export interface ResponsiveImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

/**
 * Generate responsive image attributes for different viewport sizes
 * Note: Requires pre-generated image sizes to exist in the assets folder
 * 
 * @param basePath - Base image path (e.g., '/assets/projects/project-name.png')
 * @param isAboveFold - Whether the image is above the fold (uses eager loading)
 * @returns Image attributes for responsive loading
 */
export function getResponsiveImageProps(
  basePath: string,
  isAboveFold: boolean = false
): ResponsiveImageProps {
  // For now, we'll use the original image
  // In the future, when responsive sizes are generated, we can uncomment:
  // const baseName = basePath.replace(/\.[^/.]+$/, ''); // Remove extension
  // const ext = basePath.match(/\.[^/.]+$/)?.[0] || '.png';
  
  // Example srcset when responsive images are available:
  // srcSet: `${baseName}-400w${ext} 400w, ${baseName}-800w${ext} 800w, ${baseName}-1200w${ext} 1200w`,
  
  return {
    src: basePath,
    // srcSet: undefined, // TODO: Add when responsive images are generated
    // sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw', // TODO: Adjust per component
    loading: isAboveFold ? 'eager' : 'lazy',
    decoding: 'async',
  };
}

/**
 * Preload critical images for above-the-fold content
 * Call this in App.tsx or main component for hero images
 * 
 * @param imagePaths - Array of image paths to preload
 */
export function preloadImages(imagePaths: string[]): void {
  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
}

/**
 * Generate a tiny placeholder data URL for blur-up effect
 * This is a simple gray placeholder - in production, use actual LQIP generation
 * 
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @param color - Placeholder color (default: dark gray)
 * @returns Data URL for placeholder image
 */
export function generatePlaceholder(
  width: number = 10,
  height: number = 10,
  color: string = '#27272a'
): string {
  // Create a tiny canvas for the placeholder
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/png');
}
