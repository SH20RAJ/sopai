import Link from "next/link";
import { Input } from "@/components/ui/input"


export default function Header() {
  return (
   
    <header className="bg-gray-100 dark:bg-gray-800 py-4 shadow">
    <div
      className="container mx-auto px-4 md:px-6 flex items-center justify-between">
      <Link
        className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
        href="/">
        <MountainIcon className="h-6 w-6" />
        <span>SopAI</span>
      </Link>
      <nav className="hidden md:flex items-center gap-4">
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
          href="#">
          3D Models
        </Link>
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
          href="#">
          Textures
        </Link>
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
          href="#">
          Brushes
        </Link>
        <Link
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
          href="#">
          Plugins
        </Link>
      </nav>
      <div className="relative w-full max-w-md">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full bg-white dark:bg-gray-950 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-300"
          placeholder="Search for assets..."
          type="search" />
      </div>
    </div>
  </header>

  )
}



function MountainIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>)
    );
  }
  
  
  function SearchIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>)
    );
  }
  