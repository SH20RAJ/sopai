import { ImageFeed, ImageFeeds } from '@/components/image-feeds';
import getImageSearch from './getImageSearch';

export default async function page(req,res) {
    // let url = new URL(req.url);
    // let q = url.searchParams.get("q");
    let q = "girl";
    let images = await getImageSearch(q)
  return (
    <>
            <>
        <main className="container mx-auto py-12 px-4 md:px-6">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">All Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              images.images.map((image,i)=> {
  
               return <ImageFeed image={image.image} key={i}/>
              })
              // JSON.stringify(images)
            }
  
            
          </div>
        </section>
     
      </main>
      {/* <Feeds/> */}
      </>
    </>
  )
}

