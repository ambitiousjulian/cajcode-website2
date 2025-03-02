// src/components/ui/PlaceholderImage.tsx
"use client";

import Image from 'next/image';
import { FC } from 'react';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
}

const PlaceholderImage: FC<PlaceholderImageProps> = ({ src, alt, className }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src || '/placeholder.jpg'}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default PlaceholderImage;