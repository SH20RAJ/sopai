/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/AoH1uMSZO89
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Comfortaa } from 'next/font/google'
import { Syne } from 'next/font/google'

comfortaa({
  subsets: ['latin'],
  display: 'swap',
})

syne({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export function GeneratorsType() {
  return (<>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Generate Stunning Images
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Our advanced AI model can transform your text prompts into breathtaking, high-quality images. Unleash
                your creativity and bring your ideas to life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button variant="primary">Get Started</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/placeholder.svg"
            width="550" />
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Image Generation</h2>
              <p
                className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Enter a text prompt and let our AI model generate a stunning image for you.
              </p>
            </div>
            <form className="grid gap-4">
              <Input className="w-full" placeholder="Enter a text prompt" type="text" />
              <div className="grid grid-cols-3 gap-4">
                <Select label="Size" options={["256x256", "512x512", "1024x1024"]} />
                <Select label="Style" options={["Realistic", "Surreal", "Impressionist"]} />
                <Select label="Quality" options={["Low", "Medium", "High"]} />
              </div>
              <Button variant="primary">Generate</Button>
            </form>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Image Editing</h2>
              <p
                className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Refine and enhance your generated images with our powerful editing tools.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline">Crop</Button>
                <Button variant="outline">Resize</Button>
                <Button variant="outline">Filters</Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline">Adjust</Button>
                <Button variant="outline">Save</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}
