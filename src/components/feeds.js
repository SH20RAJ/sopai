'use client';
import { useState, useEffect } from 'react';
import { ImageFeed } from './image-feeds'; // Assuming you have ImageFeed component

export default function Feeds() {
  const [images, setImages] = useState({ items: [] });
  const [cursor, setCursor] = useState('12222');

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadImages() {
    try {
      const data = await getImages(cursor);
      setImages(data);
      if (data.metadata.nextCursor) {
        setCursor(data.metadata.nextCursor);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  async function loadMoreImages() {
    try {
      const nextPageImages = await getImages(cursor);
      setImages((prevImages) => ({
        items: [...prevImages.items, ...nextPageImages.items],
      }));
      if (nextPageImages.metadata.nextCursor) {
        setCursor(nextPageImages.metadata.nextCursor);
      } else {
        setCursor('');
      }
    } catch (error) {
      console.error('Error loading more images:', error);
    }
  }

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">All Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.items.map((image, i) => (
            <ImageFeed image={image} key={i} />
          ))}
        </div>
        <center>
        {cursor && (
          <button onClick={loadMoreImages} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Load More
          </button>
        )}

        </center>
      </section>
    </main>
  );
}

async function getImages(cursor) {
  const response = await fetch(`https://civitai.com/api/v1/images?cursor=${cursor}`);
  const data = await response.json();
  return data;
}
