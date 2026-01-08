<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'MacBook Pro',
                'description' => '16-inch MacBook Pro with M3 Pro chip',
                'price' => 2499.99,
                'stock_quantity' => 25,
            ],
            [
                'name' => 'iPhone 15 Pro',
                'description' => 'Latest iPhone with A17 Pro chip',
                'price' => 999.99,
                'stock_quantity' => 50,
            ],
            [
                'name' => 'Sony WH-1000XM5',
                'description' => 'Noise cancelling headphones',
                'price' => 399.99,
                'stock_quantity' => 100,
            ],
            [
                'name' => 'Logitech MX Master 3S',
                'description' => 'Wireless ergonomic mouse',
                'price' => 99.99,
                'stock_quantity' => 75,
            ],
            [
                'name' => 'Samsung 4K Monitor',
                'description' => '32-inch 4K UHD monitor',
                'price' => 349.99,
                'stock_quantity' => 30,
            ],
            [
                'name' => 'Apple Watch Series 9',
                'description' => 'Smartwatch with ECG feature',
                'price' => 399.99,
                'stock_quantity' => 40,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
        
        $this->command->info('Products created successfully!');
    }
}