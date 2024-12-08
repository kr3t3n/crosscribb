import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing and using CrossCribb.Click, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. Use License</h2>
              <p>
                Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. Disclaimer</h2>
              <p>
                The materials on CrossCribb.Click are provided on an 'as is' basis. CrossCribb.Click makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Limitations</h2>
              <p>
                In no event shall CrossCribb.Click or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CrossCribb.Click.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">5. Revisions and Errata</h2>
              <p>
                The materials appearing on CrossCribb.Click could include technical, typographical, or photographic errors. CrossCribb.Click does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}