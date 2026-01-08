<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return redirect()->route('products.index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    
    // Cart
    Route::get('/cart', [CartController::class, 'show'])->name('cart.show');
    Route::post('/cart/add/{product}', [CartController::class, 'addItem'])->name('cart.add');
    Route::put('/cart/items/{cartItem}', [CartController::class, 'updateItem'])->name('cart.update');
    Route::delete('/cart/items/{cartItem}', [CartController::class, 'removeItem'])->name('cart.remove');
});

Route::get('/debug-cart-data', function() {
    if (!auth()->check()) {
        return "Not logged in";
    }
    
    $user = auth()->user();
    $cart = $user->cart()->with('items.product')->first();
    
    return response()->json([
        'user_id' => $user->id,
        'cart_exists' => $cart ? true : false,
        'cart_id' => $cart ? $cart->id : null,
        'cart_items_count' => $cart ? $cart->items->count() : 0,
        'cart_items' => $cart ? $cart->items->map(function($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product ? $item->product->name : 'No product',
                'quantity' => $item->quantity,
                'price' => $item->price,
            ];
        }) : [],
        'all_cart_items_in_db' => \App\Models\CartItem::all()->map(function($item) {
            return [
                'id' => $item->id,
                'cart_id' => $item->cart_id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
            ];
        }),
    ]);
});

Route::get('/test-add-to-cart/{product}', function($productId) {
    if (!auth()->check()) {
        return redirect('/login');
    }
    
    $product = \App\Models\Product::find($productId);
    if (!$product) {
        return "Product not found";
    }
    
    $user = auth()->user();
    $cart = $user->cart()->firstOrCreate(['user_id' => $user->id]);
    
    $cartItem = $cart->items()->where('product_id', $product->id)->first();
    
    if ($cartItem) {
        $cartItem->update(['quantity' => $cartItem->quantity + 1]);
    } else {
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price,
        ]);
    }
    
    return redirect('/debug-cart-data');
});

Route::get('/force-add-to-cart/{productId}', function($productId) {
    if (!auth()->check()) {
        return redirect('/login');
    }
    
    $product = \App\Models\Product::find($productId);
    if (!$product) {
        return "Product not found";
    }
    
    $user = auth()->user();
    
    // Get or create cart
    $cart = $user->cart()->firstOrCreate(['user_id' => $user->id]);
    
    // Add item
    $cartItem = $cart->items()->where('product_id', $product->id)->first();
    
    if ($cartItem) {
        $cartItem->update(['quantity' => $cartItem->quantity + 1]);
        $message = "Updated quantity to " . $cartItem->quantity;
    } else {
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price,
        ]);
        $message = "Created new cart item";
    }
    
    // Return debug info
    return response()->json([
        'success' => true,
        'message' => $message,
        'cart_id' => $cart->id,
        'cart_items_count' => $cart->items()->count(),
        'all_items' => $cart->items()->get()->map(function($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product ? $item->product->name : 'Unknown',
                'quantity' => $item->quantity,
                'price' => $item->price,
            ];
        }),
    ]);
});

Route::get('/check-auth', function() {
    return response()->json([
        'is_authenticated' => auth()->check(),
        'user_id' => auth()->id(),
        'user_email' => auth()->user() ? auth()->user()->email : null,
    ]);
});

// Authentication Routes (if not already included)
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

    
require __DIR__.'/auth.php';
