import { Link, Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Shield, BookOpen, Users, TrendingUp } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    author: {
        name: string;
    };
    published_at: string;
    status: string;
}

interface PaginatedArticles {
    data: Article[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props {
    articles: PaginatedArticles;
    search: string;
    auth?: {
        user: unknown;
    };
    [key: string]: unknown;
}

export default function Welcome({ articles, search, auth }: Props) {
    const [searchQuery, setSearchQuery] = useState(search);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/', { search: searchQuery }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <Head title="CyberTech News - Portal Berita Teknologi Keamanan Siber" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                🛡️ Berita Terdepan Keamanan Siber
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100">
                                Dapatkan informasi terkini tentang teknologi keamanan siber, 
                                threat intelligence, dan best practices untuk melindungi digital asset Anda
                            </p>
                            
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex max-w-md mx-auto mb-8">
                                <div className="relative flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Cari artikel..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pr-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                    />
                                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200" />
                                </div>
                                <Button type="submit" className="ml-2 bg-white text-blue-600 hover:bg-blue-50">
                                    Cari
                                </Button>
                            </form>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                                <div className="text-center">
                                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                    <div className="text-2xl font-bold">{articles.total}</div>
                                    <div className="text-blue-200">Artikel Tersedia</div>
                                </div>
                                <div className="text-center">
                                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-blue-200">Update Terbaru</div>
                                </div>
                                <div className="text-center">
                                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                                    <div className="text-2xl font-bold">Expert</div>
                                    <div className="text-blue-200">Contributors</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                🚀 Mengapa Memilih CyberTech News?
                            </h3>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Platform terpercaya untuk informasi keamanan siber terkini
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-8 w-8 text-blue-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">🔒 Konten Berkualitas</h4>
                                <p className="text-gray-600">
                                    Artikel mendalam dari expert keamanan siber dengan analisis terkini
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="h-8 w-8 text-green-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">📈 Update Real-time</h4>
                                <p className="text-gray-600">
                                    Berita terbaru tentang ancaman cyber, vulnerability, dan solusi keamanan
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-purple-600" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">👥 Komunitas Expert</h4>
                                <p className="text-gray-600">
                                    Bergabung dengan komunitas profesional keamanan siber Indonesia
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold text-gray-900">
                                📰 Artikel Terbaru
                            </h3>
                            {search && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Hasil pencarian untuk:</span>
                                    <Badge variant="secondary">{search}</Badge>
                                </div>
                            )}
                        </div>

                        {articles.data.length === 0 ? (
                            <div className="text-center py-16">
                                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold text-gray-600 mb-2">
                                    Tidak ada artikel ditemukan
                                </h4>
                                <p className="text-gray-500 mb-4">
                                    {search ? 'Coba kata kunci lain atau' : 'Artikel akan segera tersedia.'}
                                </p>
                                {search && (
                                    <Link href="/">
                                        <Button>Lihat Semua Artikel</Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {articles.data.map((article) => (
                                        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={article.featured_image || 'https://picsum.photos/400/250?random=' + article.id}
                                                    alt={article.title}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-blue-600 text-white">
                                                        Keamanan Siber
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardHeader>
                                                <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {article.title}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-3">
                                                    {article.excerpt}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                    <span>By {article.author.name}</span>
                                                    <span>•</span>
                                                    <span>{formatDate(article.published_at)}</span>
                                                </div>
                                                <Link href={`/articles/${article.slug}`}>
                                                    <Button size="sm" variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        Baca Selengkapnya
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {articles.last_page > 1 && (
                                    <div className="mt-12 flex items-center justify-center space-x-4">
                                        {articles.prev_page_url && (
                                            <Link href={articles.prev_page_url}>
                                                <Button variant="outline">← Sebelumnya</Button>
                                            </Link>
                                        )}
                                        
                                        <span className="text-gray-600">
                                            Halaman {articles.current_page} dari {articles.last_page}
                                        </span>
                                        
                                        {articles.next_page_url && (
                                            <Link href={articles.next_page_url}>
                                                <Button variant="outline">Selanjutnya →</Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            🔐 Bergabunglah dengan Komunitas Keamanan Siber
                        </h3>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                            Dapatkan akses ke artikel eksklusif, analisis mendalam, dan networking dengan para expert
                        </p>
                        {!auth?.user && (
                            <div className="flex items-center justify-center space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                        Daftar Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                                        Masuk
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12">
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