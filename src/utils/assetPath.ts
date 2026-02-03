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

/**
 * Fix image path from API data
 * Converts /images/xxx.png to correct base URL path
 * Also handles paths that are already correct or external URLs
 */
export function fixImagePath(path: string | undefined): string {
  if (!path) return '';
  
  // If it's an external URL (http/https), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If path already starts with base URL, return as-is
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    return path;
  }
  
  // If path starts with /images/, fix it
  if (path.startsWith('/images/')) {
    const imageName = path.replace('/images/', '');
    return `${baseUrl}images/${imageName}`;
  }
  
  // If path starts with /, add base URL
  if (path.startsWith('/')) {
    return `${baseUrl}${path.slice(1)}`;
  }
  
  return path;
}
