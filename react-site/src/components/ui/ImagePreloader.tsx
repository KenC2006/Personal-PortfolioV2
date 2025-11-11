'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experiences';

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

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const imagePaths = getAllImagePaths();
  useImagePreloader(imagePaths);

  return <>{children}</>;
}
