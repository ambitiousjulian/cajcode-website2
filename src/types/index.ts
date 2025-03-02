export interface App {
    id: number;
    title: string;
    description: string;
    image: string;
    appStoreUrl: string;
    technologies: string[];
    features: string[];
  }
  
  export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
    technologies: string[];
    category: string;
  }
  
  export interface NavItem {
    name: string;
    href: string;
  }