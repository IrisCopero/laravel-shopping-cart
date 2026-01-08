<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock_quantity',
        'image',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function cartItems()
    {
        return $this->hasMany(cartItems::class);
    }

    public function isAvailable($quantity = 1)
    {
        return $this->stock_quantity >= $quantity;
    }

    //
}
