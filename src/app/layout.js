import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const runtime = 'edge';

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata = {
  title: "SopAI - AI Image Generator | Create Stunning Images with AI",
  description: "Transform your ideas into stunning visuals with SopAI's advanced AI image generator. Create unique, high-quality images instantly.",
  keywords: "AI image generator, artificial intelligence art, AI art creator, image generation, AI art tool",
  authors: [{ name: "SopAI" }],
  openGraph: {
    title: "SopAI - AI Image Generator | Create Stunning Images with AI",
    description: "Transform your ideas into stunning visuals with SopAI's advanced AI image generator.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SopAI - AI Image Generator",
    description: "Transform your ideas into stunning visuals with SopAI's advanced AI image generator.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="darko" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-gray-900 transition-colors duration-300">
              <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px] dark:bg-[rgba(73,49,144,0.5)]" />
            </div>
          </div>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
