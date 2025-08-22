import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Plus, Edit, Eye, Shield } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard - CyberTech News" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Selamat datang di panel admin CyberTech News</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/manage/articles/create" className="block">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Artikel Baru</CardTitle>
                                <Plus className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-600">+</div>
                                <p className="text-xs text-muted-foreground">Buat artikel cybersecurity</p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/manage/articles" className="block">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Kelola Artikel</CardTitle>
                                <Edit className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">📝</div>
                                <p className="text-xs text-muted-foreground">Edit dan kelola konten</p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/" className="block">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Lihat Website</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600">🌐</div>
                                <p className="text-xs text-muted-foreground">Portal berita publik</p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Keamanan</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">🔒</div>
                            <p className="text-xs text-muted-foreground">Sistem aman & terlindungi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Welcome Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Shield className="h-6 w-6 text-blue-600" />
                                    <span>Selamat Datang di CyberTech News</span>
                                </CardTitle>
                                <CardDescription>
                                    Portal berita keamanan siber terdepan di Indonesia
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-gray-600">
                                    Platform ini memungkinkan Anda untuk mengelola konten artikel tentang keamanan siber, 
                                    teknologi terbaru, dan ancaman cyber yang berkembang saat ini.
                                </p>
                                
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Fitur Utama:</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Buat dan publikasikan artikel keamanan siber</li>
                                        <li>• Kelola status artikel (draft, published, archived)</li>
                                        <li>• Upload gambar dan media pendukung</li>
                                        <li>• SEO-friendly URLs dan meta descriptions</li>
                                        <li>• Interface yang user-friendly dan responsive</li>
                                    </ul>
                                </div>

                                <div className="flex space-x-4">
                                    <Link href="/manage/articles/create">
                                        <Button className="flex items-center space-x-2">
                                            <Plus className="h-4 w-4" />
                                            <span>Mulai Menulis</span>
                                        </Button>
                                    </Link>
                                    <Link href="/manage/articles">
                                        <Button variant="outline" className="flex items-center space-x-2">
                                            <BookOpen className="h-4 w-4" />
                                            <span>Lihat Artikel</span>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Status Sistem</span>
                                    <span className="text-sm font-medium text-green-600">🟢 Online</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Keamanan</span>
                                    <span className="text-sm font-medium text-green-600">🔐 Aman</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Database</span>
                                    <span className="text-sm font-medium text-green-600">✅ Aktif</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tips Keamanan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        <strong>💡 Tips:</strong> Selalu logout setelah selesai menggunakan dashboard 
                                        dan pastikan konten yang dipublikasi sudah melalui review keamanan.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
