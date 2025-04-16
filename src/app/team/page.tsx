"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function TeamPage() {
  return (
    <div className="w-full py-20">
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Meet Our Team
          </h1>
          <p className="text-xl text-light/80 max-w-2xl mx-auto">
            The passionate individuals behind CAJCODE's innovative solutions
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Julian Cajuste */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card group hover:border-primary/50 transition-colors"
          >
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
              <Image
                src="/images/skyview.jpg"
                alt="Julian Cajuste"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Julian Cajuste</h3>
            <p className="text-primary text-center mb-4">Founder & CEO</p>
            <p className="text-light/70 text-center mb-6">
              Passionate developer and entrepreneur with extensive experience in iOS and web development. 
              Leading CAJCODE's vision and technical direction.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://linkedin.com/in/julian-cajuste"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/ambitiousjulian"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </motion.div>

          {/* Wolfgang Kehr-Kiester */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card group hover:border-primary/50 transition-colors"
          >
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
              <Image
                src="/images/wolfgang.jpg"
                alt="Wolfgang Kehr-Kiester"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Wolfgang Kehr-Kiester</h3>
            <p className="text-primary text-center mb-4">Dev Software Engineer Intern</p>
            <p className="text-light/70 text-center mb-6">
              Software intern focusing on frontend and backend growth projects, learning fast and building with care across CAJCODE platforms.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://linkedin.com/in/wolfgang-kehr-kiester-62705021b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/wolfiek19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/70 hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
