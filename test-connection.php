<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

try {
    $db = DB::connection()->getPdo();
    echo "Database connected successfully!\n";
    echo "Database: " . DB::connection()->getDatabaseName() . "\n";
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}