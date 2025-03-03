// src/components/sections/ProjectGrid.tsx
"use client";

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    technologies: string[];
    category: string;
  };
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group hover:border-secondary/50 transition-colors"
    >
      <div className="relative w-full h-[400px] sm:h-[300px] md:h-[400px] mb-6 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
          priority={index < 2}
        />
      </div>
      <div className="space-y-4">
        <span className="text-sm text-secondary block">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-light/70">{project.description}</p>
        <div className="flex flex-wrap gap-2">
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
          className="button-secondary inline-block px-6 py-2 hover:transform hover:scale-105 transition-all duration-300"
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
};

const ProjectGrid: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="py-20 bg-dark/50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-light/10 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-light/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-dark/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            Explore our portfolio of web development projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;