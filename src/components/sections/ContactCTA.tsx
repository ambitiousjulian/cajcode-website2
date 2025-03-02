"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/components/contexts/LoadingContext';

const ContactCTA: FC = () => {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleNavigation = async (path: string) => {
    setIsLoading(true);
    await router.push(path);
    setIsLoading(false);
  };
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-light/80 mb-8 max-w-2xl mx-auto">
            Ready to bring your ideas to life? We're here to help you create
            exceptional digital experiences.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/contact')}
            className="button-primary text-lg px-8 py-3"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="absolute inset-0 backdrop-blur-[50px]" />
      </div>
    </section>
  );
};

export default ContactCTA;