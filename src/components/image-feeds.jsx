'use client'
import getImages from "@/app/functions/getImages";
import Link from "next/link"
import Feeds from "./feeds";
import { useState } from "react";

export async function ImageFeeds() {
  const images = await getImages();
  return (
    (
      <>
      <main className="container mx-auto py-12 px-4 md:px-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">All Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            images.items.map((image,i)=> {

             return <ImageFeed image={image} key={i}/>
            })
            // JSON.stringify(images)
          }

          
        </div>
      </section>
   
    </main>
    <Feeds/>
    </>


    
  )
  );
}


export function ImageFeed({image}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleView = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    const response = await fetch(image.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-${image.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="relative group cursor-pointer">
        <img
          alt="Image 1"
          className="w-full ch-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
          height={768}
          src={image.url || "/placeholder.svg"}
          style={{
            aspectRatio: "512/768",
            objectFit: "cover",
          }}
          width={512}
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex flex-col items-center justify-center transition-colors">
          <button 
            className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-2"
            onClick={handleView}
          >
            View
          </button>
          <button 
            className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-2"
            onClick={handleDownload}
          >
            Download
          </button>
          <div className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            {image?.meta?.prompt?.substring(1,20)}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative">
            <button 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
            <img
              src={image.url}
              alt="Full size"
              className="max-w-full h-auto"
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function TopFeeds() {
  return <>
  
  <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link className="relative group" href="#">
            <img
              alt="Category 1"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Nature
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Category 2"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Architecture
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Category 3"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                People
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Category 4"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Travel
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Popular Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link className="relative group" href="#">
            <img
              alt="Popular Image 1"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Popular Image 2"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Popular Image 3"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Popular Image 4"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Newest Uploads</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link className="relative group" href="#">
            <img
              alt="Newest Image 1"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Newest Image 2"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Newest Image 3"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
          <Link className="relative group" href="#">
            <img
              alt="Newest Image 4"
              className="w-full h-60 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width={300} />
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-colors">
              <span
                className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </Link>
        </div>
      </section>
      </>
}