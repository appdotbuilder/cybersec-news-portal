import { Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Shield, BookOpen } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    author: {
        name: string;
    };
    published_at: string;
    status: string;
}

interface RelatedArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    author: {
        name: string;
    };
    published_at: string;
}

interface Props {
    article: Article;
    relatedArticles: RelatedArticle[];
    auth?: {
        user: unknown;
    };
    [key: string]: unknown;
}

export default function ShowArticle({ article, relatedArticles, auth }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatContent = (content: string) => {
        return content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700">
                {paragraph}
            </p>
        ));
    };

    return (
        <>
            <Head title={`${article.title} - CyberTech News`} />
            
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">CyberTech News</h1>
                                    <p className="text-sm text-gray-600">Portal Berita Keamanan Siber</p>
                                </div>
                            </Link>
                            
                            <div className="flex items-center space-x-4">
                                <Link href="/">
                                    <Button variant="outline" className="flex items-center space-x-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Kembali</span>
                                    </Button>
                                </Link>
                                {auth?.user ? (
                                    <div className="flex items-center space-x-4">
                                        <Link href="/dashboard">
                                            <Button variant="outline">Dashboard</Button>
                                        </Link>
                                        <Link href="/manage/articles">
                                            <Button>Kelola Artikel</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link href="/login">
                                            <Button variant="outline">Masuk</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button>Daftar</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <main className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Article Header */}
                            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                                <div className="mb-4">
                                    <Badge className="bg-blue-600 text-white mb-4">
                                        Keamanan Siber
                                    </Badge>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                        {article.title}
                                    </h1>
                                    <div className="flex items-center space-x-6 text-gray-600 mb-6">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-5 w-5" />
                                            <span>By {article.author.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-5 w-5" />
                                            <span>{formatDate(article.published_at)}</span>
                                        </div>
                                    </div>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </div>

                                {/* Featured Image */}
                                {article.featured_image && (
                                    <div className="mb-8">
                                        <img
                                            src={article.featured_image}
                                            alt={article.title}
                                            className="w-full h-96 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                {/* Article Content */}
                                <div className="prose prose-lg max-w-none">
                                    {formatContent(article.content)}
                                </div>

                                {/* Author Info */}
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center">
                                            <User className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-gray-900">{article.author.name}</h4>
                                            <p className="text-gray-600">Cybersecurity Expert & Writer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                        <span>Artikel Terkait</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {relatedArticles.map((relatedArticle) => (
                                            <Card key={relatedArticle.id} className="hover:shadow-lg transition-all duration-300 group">
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={relatedArticle.featured_image || 'https://picsum.photos/300/200?random=' + relatedArticle.id}
                                                        alt={relatedArticle.title}
                                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600 transition-colors">
                                                        {relatedArticle.title}
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-2">
                                                        {relatedArticle.excerpt}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardFooter className="pt-0">
                                                    <Link href={`/articles/${relatedArticle.slug}`} className="w-full">
                                                        <Button size="sm" variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                            Baca Artikel
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">CyberTech News</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Portal berita teknologi keamanan siber terpercaya di Indonesia
                            </p>
                            <div className="text-sm text-gray-500">
                                © 2024 CyberTech News. Semua hak cipta dilindungi.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}