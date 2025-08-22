import { Link, Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppShell } from '@/components/app-shell';
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    status: 'draft' | 'published' | 'archived';
    author: {
        name: string;
    };
    published_at: string | null;
    created_at: string;
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
    [key: string]: unknown;
}

export default function ManageArticles({ articles }: Props) {
    const handleDelete = (article: Article) => {
        if (confirm(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`)) {
            router.delete(`/manage/articles/${article.id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                }
            });
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            published: 'bg-green-100 text-green-800',
            draft: 'bg-yellow-100 text-yellow-800',
            archived: 'bg-gray-100 text-gray-800'
        } as const;

        const labels = {
            published: 'Dipublikasi',
            draft: 'Draft',
            archived: 'Arsip'
        } as const;

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {labels[status as keyof typeof labels]}
            </Badge>
        );
    };

    return (
        <AppShell>
            <Head title="Kelola Artikel - CyberTech News" />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Artikel</h1>
                        <p className="text-gray-600 mt-2">Buat dan kelola artikel keamanan siber Anda</p>
                    </div>
                    <Link href="/manage/articles/create">
                        <Button className="flex items-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Artikel Baru</span>
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{articles.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Dipublikasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {articles.data.filter(a => a.status === 'published').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Draft</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {articles.data.filter(a => a.status === 'draft').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Articles List */}
                {articles.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada artikel</h3>
                            <p className="text-gray-600 mb-4">Mulai menulis artikel pertama Anda</p>
                            <Link href="/manage/articles/create">
                                <Button>Buat Artikel Pertama</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {articles.data.map((article) => (
                                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        {article.featured_image && (
                                            <img
                                                src={article.featured_image}
                                                alt={article.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                        )}
                                        <div className="absolute top-4 left-4">
                                            {getStatusBadge(article.status)}
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {article.excerpt}
                                        </CardDescription>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2">
                                            <div className="flex items-center space-x-1">
                                                <User className="h-4 w-4" />
                                                <span>{article.author.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {article.status === 'published' && article.published_at 
                                                        ? formatDate(article.published_at)
                                                        : formatDate(article.created_at)
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="flex items-center space-x-2">
                                        {article.status === 'published' && (
                                            <Link href={`/articles/${article.slug}`} target="_blank">
                                                <Button size="sm" variant="outline" className="flex items-center space-x-1">
                                                    <Eye className="h-4 w-4" />
                                                    <span>Lihat</span>
                                                </Button>
                                            </Link>
                                        )}
                                        <Link href={`/manage/articles/${article.id}/edit`}>
                                            <Button size="sm" variant="outline" className="flex items-center space-x-1">
                                                <Edit className="h-4 w-4" />
                                                <span>Edit</span>
                                            </Button>
                                        </Link>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="flex items-center space-x-1 text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(article)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Hapus</span>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {articles.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center space-x-4">
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
        </AppShell>
    );
}