import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <header className="text-gray-600 body-font shadow sticky top-0 bg-white z-30 opacity-90">
            <div className="container z-50 mx-auto flex flex-wrap py-3 px-12 flex-col md:flex-row items-center">
                <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">Tailblocks</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href='/' className="mr-5 hover:text-gray-900">Home page</Link>
                    <Link href='/products' className="mr-5 hover:text-gray-900">All Products</Link>
                    <Link href='/contact' className="mr-5 hover:text-gray-900">Contacts</Link>
                </nav>
                <Link href='/shopping-cart' className="inline-flex items-center text-sm bg-blue-500 text-white border-0 py-2 px-6 focus:outline-none transition-all duration-150 hover:bg-blue-900 rounded font-semibold mt-4 md:mt-0">My bag
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
        </header>
    )
}
