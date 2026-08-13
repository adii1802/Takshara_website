import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoTak from '../../assets/logo_tak.png';

export default function Header({ onLogoClick }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Developers', path: '/developers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="h-16 w-full mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        <Link to="/" onClick={onLogoClick} className="flex items-center gap-base">
          <img
            alt="Takshara Technologies"
            className="h-8 w-auto object-contain rounded"
            src={logoTak}
          />
          <span className="font-headline-md text-headline-md text-on-surface">Takshara</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-gutter">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-label-md text-label-md transition-colors ${isActive
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-base">
          <Link
            to="/contact"
            className="px-gutter py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
