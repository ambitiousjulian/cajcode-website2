"use client";

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';

const ProjectGrid: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
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
    </section>
  );
};

export default ProjectGrid;