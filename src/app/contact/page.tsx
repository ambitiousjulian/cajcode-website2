"use client";

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import toast, { Toaster } from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Add this interface
interface ResponseData {
  success: boolean;
  message: string;
}

const ContactPage: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (data: ContactFormData) => {
    if (!data.name.trim()) return 'Name is required';
    if (!data.email.trim()) return 'Email is required';
    if (!data.email.includes('@')) return 'Invalid email format';
    if (!data.subject.trim()) return 'Subject is required';
    if (!data.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sendContactEmail = httpsCallable<ContactFormData, ResponseData>(
        functions, 
        'sendContactEmail'
      );

      const result = await sendContactEmail(formData);
      console.log('Response:', result); // Debug log

      if (result.data.success) {
        setSubmitted(true);
        toast.success(result.data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
          Get in Touch
        </h1>
        <p className="text-xl text-light/80 max-w-2xl mx-auto">
          Have a project in mind? We'd love to hear from you. Send us a message
          and we'll respond as soon as possible.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-primary/10 rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Thank You!
              </h2>
              <p className="text-light/80 mb-6">
                We've received your message and will get back to you soon.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitted(false)}
                className="button-primary"
              >
                Send Another Message
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-light mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-light/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  disabled={isSubmitting}
                  minLength={2}
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-light/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-light mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-light/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  disabled={isSubmitting}
                  minLength={3}
                  maxLength={200}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-dark/50 border border-light/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                  disabled={isSubmitting}
                  minLength={10}
                  maxLength={1000}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="button-primary w-full py-3 text-lg relative disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;