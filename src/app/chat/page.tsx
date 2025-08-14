// src/app/chat/page.tsx
'use client';

import { useState } from 'react';
// analyzeProducts import edilmemiş, kullanılmadığı için kaldırıldı
import Image from 'next/image'; // next/image import edildi

interface Product {
    title: string;
    price: string;
    link: string;
    thumbnail: string;
    source: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Array<{ role: string; content: string; products?: Product[] }>>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        // Kullanıcı mesajını ekle
        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // 1. Serper API ile ürün araması yap
            const searchResponse = await fetch(`/api/search?query=${encodeURIComponent(input)}`);
            if (!searchResponse.ok) {
                throw new Error(`Arama başarısız: ${searchResponse.status}`);
            }
            const searchData = await searchResponse.json();

            const products = searchData.shopping_results || [];
            const productCount = products.length;

            // Assistant mesajını ekle (ürünlerle)
            const assistantMessage = {
                role: 'assistant',
                content: `Bulduğum ${productCount} ürünü sıraladım:`,
                products: products,
            };
            setMessages((prev) => [...prev, assistantMessage]);

            // 2. Ürünler varsa, Gemini API ile analiz yap
            if (productCount > 0) {
                const analysisUserMessage = { role: 'user', content: `Bu ürünler için analiz yapar mısın?` };
                setMessages((prev) => [...prev, analysisUserMessage]);
                setLoading(true); // Yeni bir yükleme başlat

                const analyzeResponse = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ products }), // Ürünleri gönder
                });


                if (!analyzeResponse.ok) {
                    const errorText = await analyzeResponse.text();
                    console.error("Analiz API hatası:", analyzeResponse.status, errorText);
                    throw new Error(`Analiz başarısız: ${analyzeResponse.status} - ${errorText}`);
                }
                const analysisData = await analyzeResponse.json();

                const analysisAssistantMessage = {
                    role: 'assistant',
                    content: analysisData.analysis || "Analiz yapıldı ancak içerik alınamadı.",
                };
                setMessages((prev) => [...prev, analysisAssistantMessage]);
            }

        } catch (error) {
            console.error('Chat error:', error);
            let errorMessage = 'Üzgünüm, bir işlem yapılırken hata oluştu. Lütfen tekrar deneyin.';
            if (error instanceof Error) {
                errorMessage = error.message; // Daha spesifik hata mesajı
            }
            const errorMessageObj = {
                role: 'assistant',
                content: `Hata: ${errorMessage}`,
            };
            setMessages((prev) => [...prev, errorMessageObj]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">🤖 AI Chatbot</h1>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 h-[60vh] overflow-y-auto mb-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 p-4 rounded-2xl max-w-3xl ${message.role === 'user' ? 'bg-indigo-500 text-white ml-auto' : 'bg-slate-100 dark:bg-slate-800'
                                }`}
                        >
                            <p>{message.content}</p>

                            {message.products && message.products.length > 0 && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {message.products.slice(0, 6).map((product: Product, idx: number) => (
                                        <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900">
                                            {/* next/image kullanımı */}
                                            <Image
                                                src={product.thumbnail || '/placeholder.jpg'}
                                                alt={product.title}
                                                width={200} // Genişlik
                                                height={128} // Yükseklik (h-32 = 8rem = 128px varsayarak)
                                                className="w-full h-32 object-cover rounded-lg mb-2"
                                            />
                                            <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
                                            <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">{product.price}</p>
                                            <a
                                                href={product.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                                            >
                                                İncele →
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 max-w-xs">
                            <p>🔍 Arama yapılıyor...</p>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Örn: 2000 TL altı kablosuz mouse öner"
                        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-95 active:scale-95 dark:bg-white dark:text-slate-900 disabled:opacity-50"
                        disabled={loading || !input.trim()}
                    >
                        {loading ? 'Aranıyor...' : 'Gönder'}
                    </button>
                </form>

                <div className="mt-4 flex flex-wrap gap-2">
                    {[
                        '2000 TL altı kablosuz mouse',
                        'FPS için en hafif mouse',
                        '4000 TL üzeri yüksek DPI mouse',
                    ].map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => setInput(suggestion)}
                            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}