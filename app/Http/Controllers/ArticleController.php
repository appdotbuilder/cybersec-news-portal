<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of published articles for public.
     */
    public function index(Request $request)
    {
        $query = Article::published()
            ->with('author')
            ->latest('published_at');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(12);

        return Inertia::render('welcome', [
            'articles' => $articles,
            'search' => $request->get('search', '')
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        if ($article->status !== 'published') {
            abort(404);
        }

        $article->load('author');

        // Get related articles
        $relatedArticles = Article::published()
            ->where('id', '!=', $article->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('articles/show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles
        ]);
    }



    /**
     * Show the form for creating a new article.
     */
    public function create()
    {
        return Inertia::render('articles/create');
    }

    /**
     * Store a newly created article.
     */
    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();
        
        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        
        // Set author
        $data['author_id'] = auth()->id();
        
        // Set published_at if status is published
        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $article = Article::create($data);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article created successfully.');
    }

    /**
     * Show the form for editing the specified article.
     */
    public function edit(Article $article)
    {
        return Inertia::render('articles/edit', [
            'article' => $article
        ]);
    }

    /**
     * Update the specified article.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $data = $request->validated();
        
        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        
        // Set published_at if status changed to published
        if ($data['status'] === 'published' && $article->status !== 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $article->update($data);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified article.
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.manage')
            ->with('success', 'Article deleted successfully.');
    }
}