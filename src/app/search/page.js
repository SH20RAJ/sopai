'use client'
import React, { useState, useEffect } from 'react';
import { ImageFeed } from '@/components/image-feeds';

function ImageGallery({ searchParams }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allImagesFetched, setAllImagesFetched] = useState(false);

  useEffect(() => {
    // Listen for the scroll to reach the bottom to trigger more data fetch
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        fetchData();
      }
    };

    // Initial fetch of data
    fetchData();
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  // Effect for adding and removing the scroll listener

  useEffect(() => {
    // Handles updating the images when search parameters change
    setPage(1);
    setImages([]);
    setAllImagesFetched(false);
    fetchData();
  }, [searchParams.q]);

  const fetchData = async () => {
    if (loading || allImagesFetched) return;

    setLoading(true);
    try {
      const newData = await getImageSearch(searchParams.q, page);
      if (newData.images.length === 0) {
        setAllImagesFetched(true);  // Set flag if no more images to fetch
      } else {
        setImages(prevImages => [...prevImages, ...newData.images]);
        setPage(prevPage => prevPage + 1);  // Increment page after successful data fetch
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">All Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, i) => <ImageFeed image={image.image} key={i} />)}
        </div>
        {loading && <p>Loading...</p>}
        {!allImagesFetched && (
          <button onClick={() => fetchData()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Load More
          </button>
        )}
        {allImagesFetched && <p>All images fetched.</p>}
      </section>
    </main>
  );
}

export default ImageGallery;

export async function getImageSearch(q, page) {
  let data = await fetch(`https://api.searchcivitai.com/api/images?sort_by=up&nsfw=None&q=${q}&m=img&page=${page}`);
  data = await data.json();
  return data;
}
