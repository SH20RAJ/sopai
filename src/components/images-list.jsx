'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import civitaiApi from '../lib/civitai-api';

export default function ImagesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [metadata, setMetadata] = useState(null);
  const [filters, setFilters] = useState({
    nsfw: searchParams.get('nsfw') || undefined,
    sort: searchParams.get('sort') || 'Most Reactions',
    period: searchParams.get('period') || 'AllTime',
    username: searchParams.get('username') || '',
  });

  const updateUrl = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await civitaiApi.getImages({
        page,
        limit: 20,
        ...filters,
      });
      setImages(response.items || []);
      setMetadata(response.metadata);
    } catch (err) {
      setError('Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    updateUrl({ page: page.toString(), ...filters });
  }, [page, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${image.id}.${image.url.split('.').pop()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading images...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.nsfw || ''}
          onChange={(e) => handleFilterChange('nsfw', e.target.value || undefined)}
          className="p-2 border rounded-lg"
        >
          <option value="">All Content</option>
          <option value="None">Safe</option>
          <option value="Soft">Soft NSFW</option>
          <option value="Mature">Mature</option>
          <option value="X">X-rated</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="Most Reactions">Most Reactions</option>
          <option value="Most Comments">Most Comments</option>
          <option value="Newest">Newest</option>
        </select>

        <select
          value={filters.period}
          onChange={(e) => handleFilterChange('period', e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="AllTime">All Time</option>
          <option value="Year">Past Year</option>
          <option value="Month">Past Month</option>
          <option value="Week">Past Week</option>
          <option value="Day">Past Day</option>
        </select>

        <input
          type="text"
          placeholder="Filter by username..."
          value={filters.username}
          onChange={(e) => handleFilterChange('username', e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative group">
              <img
                src={image.url}
                alt={`By ${image.username}`}
                className="w-full h-64 object-cover cursor-pointer"
                loading="lazy"
                onClick={() => setSelectedImage(image)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setSelectedImage(image)}
                  className="mx-2 px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                >
                  View
                </button>
                <button
                  onClick={() => handleDownload(image)}
                  className="mx-2 px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600">By {image.username}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ {image.stats.heartCount}</span>
                <span>👍 {image.stats.likeCount}</span>
                <span>💬 {image.stats.commentCount}</span>
              </div>
              {image.meta && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-blue-500">
                    Generation Details
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(image.meta, null, 2)}
                  </pre>
                </details>
              )}
            </div>
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
          <span>Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg p-4" onClick={e => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={`By ${selectedImage.username}`}
              className="max-w-full h-auto"
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg">By {selectedImage.username}</p>
              <button
                onClick={() => handleDownload(selectedImage)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}