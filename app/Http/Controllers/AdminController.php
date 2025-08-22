<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of all articles for admin.
     */
    public function index()
    {
        return Inertia::render('dashboard');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $articles = Article::with('author')
            ->latest()
            ->paginate(10);

        return Inertia::render('articles/manage', [
            'articles' => $articles
        ]);
    }
}