import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-4">Welcome to Shopping Cart!</h2>
                            <p className="mb-4">Use the navigation menu to:</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Browse products in the <strong>Products</strong> page</li>
                                <li>Manage your shopping cart in the <strong>Cart</strong> page</li>
                                <li>View your dashboard here</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}