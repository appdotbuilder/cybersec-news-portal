<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes - articles for everyone
Route::get('/', [ArticleController::class, 'index'])->name('home');
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
    
    // Admin/Author routes for managing articles
    Route::get('/manage/articles', [AdminController::class, 'create'])->name('articles.manage');
    Route::get('/manage/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/manage/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/manage/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::patch('/manage/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/manage/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
