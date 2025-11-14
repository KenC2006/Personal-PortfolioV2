'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experiences';
import { memo, useMemo } from 'react';

const getAllImagePaths = (): string[] => {
  const paths: string[] = [];

  projects.forEach((project) => {
    if (project.image) paths.push(project.image);
  });

  experiences.forEach((experience) => {
    if (experience.logoPath) paths.push(experience.logoPath);
  });

  paths.push('/res/profilePic.JPG');

  return paths;
};

function ImagePreloader({ children }: { children: React.ReactNode }) {
  // Memoize image paths to prevent recreation on every render
  const imagePaths = useMemo(() => getAllImagePaths(), []);
  useImagePreloader(imagePaths);

  return <>{children}</>;
}

// Memoize the component to prevent re-renders
export default memo(ImagePreloader);
