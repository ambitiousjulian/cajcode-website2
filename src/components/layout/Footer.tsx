import { FC } from 'react';
import Link from 'next/link';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';

const Footer: FC = () => {
  return (
    <footer className="bg-dark/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold text-primary">
              CAJCODE
            </Link>
            <p className="mt-4 text-light/70 max-w-md">
              {SITE_CONFIG.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-light/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-light/70">
              <li>info@cajcode.com</li>
              <li>+1 (954) 616-7003</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-light/10 text-center text-light/50">
          <p>© {new Date().getFullYear()} CAJCODE LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;