import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ cart, debug, auth }) {
    console.log('Cart data received:', cart);
    console.log('Debug info:', debug);
    
    const [updatingId, setUpdatingId] = useState(null);

    // Safe defaults
    const safeCart = cart || {};
    const cartItems = safeCart.items || [];
    const itemsCount = cartItems.length;

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        setUpdatingId(itemId);
        router.put(route('cart.update', itemId), { quantity: newQuantity }, {
            onFinish: () => setUpdatingId(null),
        });
    };

    const removeItem = (itemId) => {
        if (confirm('Are you sure you want to remove this item?')) {
            router.delete(route('cart.remove', itemId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shopping Cart</h2>}
        >
            <Head title="Shopping Cart" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                    
                    {/* Debug info - can remove later */}
                    {debug && (
                        <div className="mb-4 p-4 bg-blue-50 rounded">
                            <p className="font-semibold">Debug Info:</p>
                            <p>Cart ID: {debug.cart_id || 'No cart'}</p>
                            <p>Items count: {debug.items_count || 0}</p>
                        </div>
                    )}
                    
                    {itemsCount === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <Link
                                href={route('products.index')}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="px-6 py-4 border-b">
                                <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700">
                                    <div className="col-span-6">Product</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-center">Total</div>
                                </div>
                            </div>
                            
                            {cartItems.map((item) => (
                                <div key={item.id} className="px-6 py-4 border-b">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-6">
                                            <h3 className="font-medium">{item.product?.name || 'Unknown Product'}</h3>
                                        </div>
                                        
                                        <div className="col-span-2 text-center">
                                            ${item.price || 0}
                                        </div>
                                        
                                        <div className="col-span-2 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                    disabled={(item.quantity || 1) <= 1 || updatingId === item.id}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded disabled:opacity-50"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                    disabled={updatingId === item.id}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="col-span-1 text-center font-medium">
                                            ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                        </div>
                                        
                                        <div className="col-span-1 text-center">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="px-6 py-4 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={route('products.index')}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Continue Shopping
                                    </Link>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">
                                            Total: ${cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}