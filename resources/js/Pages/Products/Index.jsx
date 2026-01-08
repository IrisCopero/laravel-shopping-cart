import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products, auth }) {
    console.log('Products data:', products); // Check console
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
                    
                    
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                        <p className="text-gray-600 mt-2">${product.price}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Stock: {product.stock_quantity}
                                        </p>
                                        <div className="mt-4">
                                            <Link
                                                href={route('cart.add', product.id)}
                                                method="post"
                                                data={{ quantity: 1 }}
                                                as="button"
                                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Add to Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-red-500 text-lg">NO PRODUCTS FOUND</p>
                            <p className="text-gray-600 mt-2">Check database and console (F12)</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}