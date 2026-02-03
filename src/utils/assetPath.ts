/**
 * Utility functions for asset paths
 * Handles base URL for GitHub Pages deployment
 */

/**
 * Get the correct asset path based on BASE_URL
 * @param path - The asset path starting with /
 * @returns The full path including base URL
 */
export function getAssetPath(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if base URL ends with slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Get image path
 * @param imageName - Image filename (e.g., 'logo.svg', 'hero-bg.png')
 * @returns Full path to image
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`images/${imageName}`);
}
