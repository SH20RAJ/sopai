import Link from 'next/link'

export default function Footer() {
  return (
    <>
          <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-8">
      <div
        className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400 text-sm">© 2024 Civitai. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
            href="#">
            Terms of Service
          </Link>
          <Link
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
            href="#">
            Privacy Policy
          </Link>
          <Link
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-sm"
            href="#">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
    </>
  )
}
