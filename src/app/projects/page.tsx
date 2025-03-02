// src/app/projects/page.tsx
"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import Image from 'next/image';

const ProjectsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
          Our Projects
        </h1>
        <p className="text-xl text-light/80 max-w-2xl mx-auto">
          Explore our portfolio of innovative web development projects
          and digital solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group hover:border-secondary/50 transition-colors"
          >
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-sm text-secondary mb-2 block">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
            <p className="text-light/70 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary inline-block"
            >
              View Project
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;