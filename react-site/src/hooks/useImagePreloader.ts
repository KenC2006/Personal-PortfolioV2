'use client';

import { useEffect, useState } from 'react';

interface PreloadStatus {
  isLoading: boolean;
  progress: number;
  total: number;
  loaded: number;
}

export function useImagePreloader(imagePaths: string[]): PreloadStatus {
  const [status, setStatus] = useState<PreloadStatus>({
    isLoading: true,
    progress: 0,
    total: imagePaths.length,
    loaded: 0,
  });

  useEffect(() => {
    if (imagePaths.length === 0) {
      setStatus({ isLoading: false, progress: 100, total: 0, loaded: 0 });
      return;
    }

    let loadedCount = 0;
    const total = imagePaths.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          loadedCount++;
          setStatus({
            isLoading: loadedCount < total,
            progress: Math.round((loadedCount / total) * 100),
            total,
            loaded: loadedCount,
          });
          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          loadedCount++;
          setStatus({
            isLoading: loadedCount < total,
            progress: Math.round((loadedCount / total) * 100),
            total,
            loaded: loadedCount,
          });
          resolve(); // Still resolve to not block other images
        };

        img.src = src;
      });
    };

    // Preload all images in parallel
    Promise.all(imagePaths.map(preloadImage)).then(() => {
      setStatus({
        isLoading: false,
        progress: 100,
        total,
        loaded: total,
      });
    });
  }, [imagePaths]);

  return status;
}
