<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => $this->faker->paragraph(3),
            'content' => $this->generateTechContent(),
            'featured_image' => 'https://picsum.photos/800/600?random=' . random_int(1, 1000),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'author_id' => User::factory(),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Generate technology-focused content for articles.
     */
    protected function generateTechContent(): string
    {
        $cybersecurityTopics = [
            'Zero Trust Architecture: Implementing a comprehensive security model that verifies every transaction and access request.',
            'Advanced Persistent Threats (APT): Understanding sophisticated attack methods and defense strategies.',
            'Cloud Security Best Practices: Securing data and applications in cloud environments.',
            'Ransomware Protection: Multi-layered defense strategies against ransomware attacks.',
            'AI in Cybersecurity: How artificial intelligence is revolutionizing threat detection and response.',
            'Identity and Access Management: Modern approaches to controlling user access and permissions.',
            'Endpoint Security Solutions: Protecting devices in an increasingly remote work environment.',
            'Security Automation and Orchestration: Streamlining security operations with automated responses.'
        ];

        $paragraphs = [];
        for ($i = 0; $i < random_int(5, 8); $i++) {
            $topic = $this->faker->randomElement($cybersecurityTopics);
            $paragraphs[] = $topic . ' ' . $this->faker->paragraph(random_int(4, 8));
        }

        return implode("\n\n", $paragraphs);
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}