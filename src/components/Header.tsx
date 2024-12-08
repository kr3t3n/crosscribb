import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlayCircle, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { 
      name: 'Home',
      href: '/',
      icon: Home,
      description: 'Return to the homepage',
      color: 'from-primary-600 to-primary-700'
    },
    { 
      name: 'Play Game',
      href: '/game',
      icon: PlayCircle,
      description: 'Start a new game or continue playing',
      color: 'from-secondary-500 to-secondary-600'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and App Name */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/images/logo.svg"
                alt="CrossCribb.Click"
                className="h-12 w-auto"
              />
              <span className="text-base font-semibold text-primary-700 dark:text-accent">
                Cribbage Score Keeper
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link
                to="/game"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Play Now
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex items-center gap-2">
              <Link
                to="/game"
                className="flex items-center p-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                aria-label="Play Now"
              >
                <PlayCircle className="w-5 h-5" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6 text-primary-700 dark:text-accent" />
            </button>
          </div>

          <div className="grid gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:shadow-lg
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r ' + item.color + ' text-white'
                    : 'bg-gray-50 dark:bg-gray-800 hover:scale-[1.02]'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      isActive(item.href)
                        ? 'bg-white/20'
                        : 'bg-gradient-to-r ' + item.color + ' text-white'
                    }`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isActive(item.href)
                          ? 'text-white'
                          : 'text-primary-700 dark:text-white'
                      }`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${
                        isActive(item.href)
                          ? 'text-white/80'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}