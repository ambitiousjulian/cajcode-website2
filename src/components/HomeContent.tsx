// src/components/HomeContent.tsx
"use client";

import dynamic from 'next/dynamic';
import LoadingState from '@/components/ui/LoadingState';

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => <LoadingState />,
});

const AppShowcase = dynamic(() => import('@/components/sections/AppShowcase'), {
  loading: () => <LoadingState />,
});

const ProjectGrid = dynamic(() => import('@/components/sections/ProjectGrid'), {
  loading: () => <LoadingState />,
});

const ContactCTA = dynamic(() => import('@/components/sections/ContactCTA'), {
  loading: () => <LoadingState />,
});

export default function HomeContent() {
  return (
    <div className="w-full">
      <Hero />
      <AppShowcase />
      <ProjectGrid />
      <ContactCTA />
    </div>
  );
}