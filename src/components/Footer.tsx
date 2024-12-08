import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 mt-auto bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Mangia Studios Limited. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/terms" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Terms
            </Link>
            <Link to="/privacy" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Privacy
            </Link>
            <Link to="/contact" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Contact
            </Link>
          </div>
          <a 
            href="https://www.buymeacoffee.com/georgipep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Like CrossCribb? Show your love with a ☕
          </a>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Created by{' '}
            <a 
              href="https://x.com/georgipep" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Georgi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}