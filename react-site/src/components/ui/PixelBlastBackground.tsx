"use client";

import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

// Dynamically import PixelBlast with no SSR
const PixelBlast = dynamic(
  () => import('@/components/PixelBlast'),
  { ssr: false }
);

function PixelBlastBackground() {
  // Memoize the style object to prevent recreation on every render
  const containerStyle = useMemo(() => ({
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    overflow: 'hidden' as const
  }), []);

  // Memoize the props object to prevent PixelBlast re-initialization
  const pixelBlastProps = useMemo(() => ({
    variant: "circle" as const,
    pixelSize: 10,
    color: "#22D3EE",
    className: "",
    style: {},
    patternScale: 3,
    patternDensity: 1.2,
    pixelSizeJitter: 0.5,
    enableRipples: false,
    rippleSpeed: 0.4,
    rippleThickness: 0.12,
    rippleIntensityScale: 1.5,
    liquid: false,
    speed: 0.6,
    edgeFade: 0.25,
    transparent: true
  }), []);

  return (
    <div style={containerStyle}>
      <PixelBlast {...pixelBlastProps} />
    </div>
  );
}

// Memoize the entire component to prevent re-renders when parent updates
export default memo(PixelBlastBackground);
