import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation bar for guests */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="flex items-center">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    <span className="ml-3 text-xl font-bold text-gray-800">Shopping Cart</span>
                                </Link>
                            </div>
                        </div>

                        {/* Register and Login links - VISIBLE */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('register')}
                                className="font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                            >
                                Register
                            </Link>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}