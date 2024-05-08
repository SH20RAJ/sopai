'use client'
import { useState, useEffect } from 'react';
import { ImageFeed } from './image-feeds';

export default function Feeds() {
  const [images, setImages] = useState({ items: [] });
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreImages();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]); // Add page to the dependencies array

  async function loadImages() {
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  async function loadMoreImages() {
    try {
      const nextPageImages = await getImages(page + 1);
      setImages((prevImages) => ({
        items: [...prevImages.items, ...nextPageImages.items],
      }));
      setPage((prevPage) => prevPage + 1);
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
      </section>
    </main>
  );
}

async function getImages(page = 1) {
  const response = await fetch(`https://civitai.com/api/v1/images?page=${page}`);
  const data = await response.json();
  return data;
}
