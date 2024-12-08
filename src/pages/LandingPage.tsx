import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Users2, Shield } from 'lucide-react';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-900 dark:text-indigo-300">
            Welcome to CrossCribb.Click
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The ultimate scoring companion for Cribbage and Cross-Crib games. Perfect for both casual players and serious enthusiasts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <PlayCircle className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Easy Scoring</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track scores effortlessly with our intuitive interface. Perfect for both Cribbage and Cross-Crib variants.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Users2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Multiple Players</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Support for both 2-player games and team matches. Keep track of everyone's scores in one place.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Shield className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your game data stays on your device. No account required, no data collection.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/game"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Playing Now
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}