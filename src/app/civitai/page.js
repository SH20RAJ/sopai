'use client';

import { useState } from 'react';
import CreatorsList from '../../components/creators-list';
import ImagesList from '../../components/images-list';

export default function CivitaiPage() {
  const [activeTab, setActiveTab] = useState('images');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Civitai Explorer</h1>
          
          <div className="mb-8">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('images')}
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  activeTab === 'images'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setActiveTab('creators')}
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  activeTab === 'creators'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Creators
              </button>
            </nav>
          </div>

          {activeTab === 'images' ? <ImagesList /> : <CreatorsList />}
        </div>
      </div>
    </div>
  );
}