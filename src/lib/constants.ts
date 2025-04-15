// src/lib/constants.ts
import { App, Project, NavItem } from '@/types';

export const SITE_CONFIG = {
  name: 'CAJCODE LLC',
  description: 'Premium iOS & Web Development',
  url: 'https://cajcode.com',
  ogImage: 'https://cajcode.com/og-image.jpg',
};

export const NAVIGATION: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Team', href: '/team' }, 
  { name: 'Apps', href: '/apps' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export const APPS: App[] = [
  {
    id: 1,
    title: 'NextJob Ai',
    description: 'Revolutionary iOS app that gets you hired.',
    image: '/images/apps/app1.png',
    appStoreUrl: 'https://apps.apple.com/us/app/nextjob-ai/id6740534298',
    technologies: ['Swift', 'SwiftUI', 'CoreData'],
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    id: 2,
    title: 'FratSwipe',
    description: 'Innovative solution for Fraternity recruitment.',
    image: '/images/apps/app2.png',
    appStoreUrl: 'https://apps.apple.com/us/app/fratswipe/id6520395751',
    technologies: ['Swift', 'UIKit', 'Firebase'],
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'GradJump',
    description: 'Modern web application built with Next.js.',
    image: '/images/projects/project1.png',
    url: 'https://gradjump.com',
    technologies: ['Next.js', 'TypeScript', 'Tailwind'],
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'FratWrap',
    description: 'Frat-merch platform with advanced features.',
    image: '/images/projects/project2.png',
    url: 'https://fratwrap.com/',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'E-Commerce',
  },
];