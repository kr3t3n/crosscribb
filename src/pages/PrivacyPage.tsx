import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Data Collection</h2>
              <p>
                CrossCribb.Click does not collect any personal information. All game data is stored locally on your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Local Storage</h2>
              <p>
                We use local storage to save your game progress and preferences. This data never leaves your device and is not accessible to us or any third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Cookies</h2>
              <p>
                CrossCribb.Click does not use cookies for tracking or advertising purposes. Any cookies used are strictly necessary for the functioning of the application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Third-Party Services</h2>
              <p>
                We do not integrate with any third-party services that collect user data. The application runs entirely in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}