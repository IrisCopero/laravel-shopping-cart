<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function show()
    {
    $user = Auth::user();
    
    // Always get or create cart
    $cart = $user->cart()->firstOrCreate(['user_id' => $user->id]);
    
    // Load items with product relationship
    $cart->load('items.product');
    
    return Inertia::render('Cart/Show', [
        'cart' => $cart,
        
    ]);
    }

    public function addItem(Request $request, Product $product)
    {
        \Log::info('Adding item to cart', [
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'quantity' => $request->quantity,
        ]);

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        \Log::info('User found', ['user_id' => $user->id]);
        
        $cart = $user->cart()->firstOrCreate(['user_id' => $user->id]);
        \Log::info('Cart', ['cart_id' => $cart->id, 'user_id' => $cart->user_id]);
        
        // Check stock availability
        if (!$product->isAvailable($request->quantity)) {
            \Log::warning('Insufficient stock', [
                'product_id' => $product->id, 
                'requested' => $request->quantity, 
                'available' => $product->stock_quantity
            ]);
            return back()->withErrors([
                'stock' => 'Insufficient stock available',
            ]);
        }

        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        \Log::info('Existing cart item', ['cartItem' => $cartItem ? $cartItem->id : 'null']);
        
        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity,
            ]);
            \Log::info('Updated cart item', ['new_quantity' => $cartItem->quantity]);
        } else {
            $newItem = $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);
            \Log::info('Created new cart item', ['cart_item_id' => $newItem->id]);
        }

        \Log::info('Redirecting to cart');
        return redirect()->route('cart.show')->with('success', 'Item added to cart');
    }

    public function updateItem(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$cartItem->product->isAvailable($request->quantity)) {
            return back()->withErrors([
                'stock' => 'Insufficient stock available',
            ]);
        }

        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return back()->with('success', 'Cart updated');
    }

    public function removeItem(CartItem $cartItem)
    {
        if ($cartItem->cart->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart');
    }
}