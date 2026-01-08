import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navigation({ user }) {
    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <span className="text-xl font-bold text-gray-800">Shopping Cart</span>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <Link 
                                href={route('dashboard')} 
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href={route('products.index')}
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                active={route().current('products.index')}
                            >
                                Products
                            </Link>
                            <Link 
                                href={route('cart.show')}
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                active={route().current('cart.show')}
                            >
                                Cart
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="ml-3">
                            <div className="text-sm text-gray-800">{user?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}