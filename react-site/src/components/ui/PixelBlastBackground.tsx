"use client";

import dynamic from 'next/dynamic';

// Dynamically import PixelBlast with no SSR
const PixelBlast = dynamic(
  () => import('@/components/PixelBlast'),
  { ssr: false }
);

export default function PixelBlastBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <PixelBlast
        variant="circle"
        pixelSize={10}
        color="#22D3EE"
        className=""
        style={{}}
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples={false}
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />
    </div>
  );
}
