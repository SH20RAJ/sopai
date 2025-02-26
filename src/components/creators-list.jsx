'use client';

import { useState, useEffect } from 'react';
import civitaiApi from '../lib/civitai-api';

export default function CreatorsList() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const response = await civitaiApi.getCreators({
        page,
        limit: 20,
        query: searchQuery,
      });
      setCreators(response.items);
      setMetadata(response.metadata);
    } catch (err) {
      setError('Failed to load creators. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading creators...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search creators..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <div
            key={creator.username}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{creator.username}</h3>
            <p className="text-gray-600 mt-2">
              {creator.modelCount} {creator.modelCount === 1 ? 'model' : 'models'}
            </p>
            <a
              href={creator.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Models
            </a>
          </div>
        ))}
      </div>

      {metadata && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {metadata.currentPage} of {metadata.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === metadata.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}