/**
 * Returns the correct public asset URL, accounting for the Next.js basePath.
 * In dev, basePath is empty so paths work as-is.
 * In production (GitHub Pages), basePath is '/mantradevs'.
 */
export const assetPath = (path: string): string => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  // path should always start with /
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalised}`;
};
