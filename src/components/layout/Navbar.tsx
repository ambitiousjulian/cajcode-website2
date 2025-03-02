// src/components/layout/Navbar.tsx
"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '@/lib/constants';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a simple static version of your navbar
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-dark/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-2xl font-bold text-primary">
            CAJCODE
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-light/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-light"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-light/80 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;