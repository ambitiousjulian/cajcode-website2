"use client";

import { motion } from 'framer-motion';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/contexts/LoadingContext';


const Hero: FC = () => {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleNavigation = async (path: string) => {
    setIsLoading(true);
    await router.push(path);
    setIsLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold gradient-text mb-6">
            CAJCODE LLC
          </h1>
          <p className="text-xl md:text-2xl text-light/80 mb-12 max-w-2xl mx-auto">
            Crafting Premium iOS Apps & Web Experiences That Define Digital Excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary px-8 py-3 text-lg font-semibold"
              onClick={() => handleNavigation('/projects')}
              aria-label="View our work"
            >
              View Our Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-secondary px-8 py-3 text-lg font-semibold"
              onClick={() => handleNavigation('/contact')}
              aria-label="Contact us"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
      </div>
    </section>
  );
};

export default Hero;