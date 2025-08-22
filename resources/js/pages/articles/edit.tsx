import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppShell } from '@/components/app-shell';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    status: 'draft' | 'published' | 'archived';
    published_at: string | null;
    created_at: string;
}

interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    status: 'draft' | 'published' | 'archived';
    published_at: string;
    [key: string]: string;
}

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function EditArticle({ article }: Props) {
    const { data, setData, patch, processing, errors } = useForm<ArticleFormData>({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        featured_image: article.featured_image || '',
        status: article.status,
        published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0, -1) : ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        patch(`/manage/articles/${article.id}`);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);
        // Don't auto-generate slug for existing articles unless it's empty
        if (!data.slug || data.slug === generateSlug(article.title)) {
            setData('slug', generateSlug(value));
        }
    };

    return (
        <AppShell>
            <Head title={`Edit: ${article.title} - CyberTech News`} />
            
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <Link href="/manage/articles">
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Kembali</span>
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
                        <p className="text-gray-600 mt-1">{article.title}</p>
                    </div>
                    {article.status === 'published' && (
                        <Link href={`/articles/${article.slug}`} target="_blank">
                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <Eye className="h-4 w-4" />
                                <span>Lihat Live</span>
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Dasar</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label htmlFor="title">Judul Artikel *</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            className="mt-1"
                                            placeholder="Masukkan judul artikel..."
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="slug">URL Slug</Label>
                                        <Input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className="mt-1"
                                            placeholder="url-artikel-ini"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            URL: /articles/{data.slug || 'url-artikel'}
                                        </p>
                                        {errors.slug && (
                                            <p className="text-sm text-red-600 mt-1">{errors.slug}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="excerpt">Ringkasan Artikel *</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            className="mt-1"
                                            rows={3}
                                            placeholder="Tulis ringkasan singkat artikel (maks 1000 karakter)..."
                                        />
                                        <div className="flex justify-between mt-1">
                                            <span className="text-sm text-gray-500">
                                                Ringkasan yang menarik akan meningkatkan minat pembaca
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                {data.excerpt.length}/1000
                                            </span>
                                        </div>
                                        {errors.excerpt && (
                                            <p className="text-sm text-red-600 mt-1">{errors.excerpt}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="featured_image">Gambar Utama</Label>
                                        <Input
                                            id="featured_image"
                                            type="url"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            className="mt-1"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            URL gambar yang akan ditampilkan sebagai thumbnail
                                        </p>
                                        {errors.featured_image && (
                                            <p className="text-sm text-red-600 mt-1">{errors.featured_image}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Content */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Konten Artikel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <Label htmlFor="content">Isi Artikel *</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-1"
                                            rows={20}
                                            placeholder="Tulis konten artikel Anda di sini..."
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Tulis artikel yang informatif dan menarik tentang keamanan siber
                                        </p>
                                        {errors.content && (
                                            <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit Button */}
                            <div className="flex items-center space-x-4">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="flex items-center space-x-2"
                                >
                                    <Save className="h-4 w-4" />
                                    <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                                </Button>
                                <Link href="/manage/articles">
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publishing Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Publikasi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={data.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setData('status', value)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Dipublikasi</SelectItem>
                                            <SelectItem value="archived">Arsip</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {data.status === 'published' && (
                                    <div>
                                        <Label htmlFor="published_at">Tanggal Publikasi</Label>
                                        <Input
                                            id="published_at"
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="mt-1"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Kosongkan untuk menggunakan waktu saat ini
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Article Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Info Artikel</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ID:</span>
                                    <span className="font-mono">#{article.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Dibuat:</span>
                                    <span>{new Date(article.created_at || '').toLocaleDateString('id-ID')}</span>
                                </div>
                                {article.published_at && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Dipublikasi:</span>
                                        <span>{new Date(article.published_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        {data.featured_image && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview Gambar</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={data.featured_image}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Guidelines */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Panduan Menulis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Fokus pada topik keamanan siber</li>
                                    <li>• Gunakan judul yang menarik dan SEO-friendly</li>
                                    <li>• Tulis ringkasan yang informatif</li>
                                    <li>• Sertakan contoh dan studi kasus</li>
                                    <li>• Gunakan bahasa yang mudah dipahami</li>
                                    <li>• Minimum 500 kata untuk artikel berkualitas</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}