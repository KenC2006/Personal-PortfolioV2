'use client';

import { useImagePreloader } from '@/hooks/useImagePreloader';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experiences';
import { useEffect, useState } from 'react';

// Collect all image paths from the data
const getAllImagePaths = (): string[] => {
  const paths: string[] = [];

  // Add project images
  projects.forEach((project) => {
    if (project.image) paths.push(project.image);
    if (project.gifImage) paths.push(project.gifImage);
  });

  // Add experience logos
  experiences.forEach((experience) => {
    if (experience.logoPath) paths.push(experience.logoPath);
  });

  // Add any other static images you want to preload
  paths.push('/res/profilePic.JPG');
  paths.push('/res/header.jpg');

  return paths;
};

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const imagePaths = getAllImagePaths();
  const { isLoading, progress } = useImagePreloader(imagePaths);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Small delay before showing content for smooth transition
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showContent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          </div>
          <p className="text-white text-lg font-light">Loading Portfolio...</p>
          <div className="mt-4 w-64 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">{progress}%</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
