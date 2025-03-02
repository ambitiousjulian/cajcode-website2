// src/app/apps/page.tsx
"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { APPS } from '@/lib/constants';
import Image from 'next/image';

const AppsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
          Our iOS Applications
        </h1>
        <p className="text-xl text-light/80 max-w-2xl mx-auto">
          Discover our collection of meticulously crafted iOS applications,
          designed to enhance your digital experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {APPS.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group hover:border-primary/50 transition-colors"
          >
            <div className="relative aspect-[390/844] mb-6 rounded-2xl overflow-hidden">
              <Image
                src={app.image}
                alt={app.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h2 className="text-2xl font-bold mb-3">{app.title}</h2>
            <p className="text-light/70 mb-4">{app.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {app.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary inline-block"
            >
              View on App Store
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;