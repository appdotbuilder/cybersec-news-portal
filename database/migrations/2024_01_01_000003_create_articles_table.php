<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->string('slug')->unique()->comment('URL slug for the article');
            $table->text('excerpt')->comment('Short description of the article');
            $table->longText('content')->comment('Full article content');
            $table->string('featured_image')->nullable()->comment('Path to the featured image');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->comment('Article publication status');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('published_at')->nullable()->comment('When the article was published');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('slug');
            $table->index('status');
            $table->index(['status', 'published_at']);
            $table->index('author_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};