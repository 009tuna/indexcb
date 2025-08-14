// src/app/search/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react'; // useCallback eklendi
import Image from 'next/image'; // next/image import edildi

interface Criteria {
  connection: 'any' | 'wireless' | 'wired';
  maxWeight: number;
  minDpi: number;
  budget: [number, number];
  brands: string[];
}

interface Product {
  title: string;
  price: string;
  link: string;
  thumbnail: string;
  source: string;
}

export default function SearchPage() {
  const [criteria, setCriteria] = useState<Criteria>({
    connection: 'any',
    maxWeight: 65,
    minDpi: 16000,
    budget: [1500, 3000],
    brands: ['Logitech', 'Razer', 'Glorious', 'SteelSeries'],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => { // useCallback ile sarmalandı
    setLoading(true);
    try {
      const query = `mouse ${criteria.budget[0]}-${criteria.budget[1]} TL`;
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setProducts(data.shopping_results || []);
    } catch (error) { // error değişkeni kullanıldı
      console.error('Search error:', error); // Hata loglandı
    } finally {
      setLoading(false);
    }
  }, [criteria]); // criteria bağımlılığı eklendi

  useEffect(() => {
    // İlk yüklemede otomatik arama yap
    handleSearch();
  }, [handleSearch]); // handleSearch bağımlılığı eklendi

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🔍 Manuel Sorgu</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtreler Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h2 className="text-lg font-bold mb-4">Filtreler</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Bağlantı</label>
                  <select
                    value={criteria.connection}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCriteria({ ...criteria, connection: e.target.value as 'any' | 'wireless' | 'wired' })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  >
                    <option value="any">Farketmez</option>
                    <option value="wireless">Kablosuz</option>
                    <option value="wired">Kablolu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Ağırlık (g)</label>
                  <input
                    type="number"
                    value={criteria.maxWeight}
                    onChange={(e) => setCriteria({ ...criteria, maxWeight: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Min DPI</label>
                  <input
                    type="number"
                    value={criteria.minDpi}
                    onChange={(e) => setCriteria({ ...criteria, minDpi: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bütçe (₺)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={criteria.budget[0]}
                      onChange={(e) => setCriteria({ ...criteria, budget: [Number(e.target.value), criteria.budget[1]] })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={criteria.budget[1]}
                      onChange={(e) => setCriteria({ ...criteria, budget: [criteria.budget[0], Number(e.target.value)] })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 active:scale-95 dark:bg-white dark:text-slate-900 disabled:opacity-50"
                >
                  {loading ? 'Aranıyor...' : 'Sorgula'}
                </button>
              </div>
            </div>
          </div>

          {/* Sonuçlar */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Sonuçlar ({products.length})</h2>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p>🔍 Ürünler aranıyor...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product: Product, index: number) => (
                  <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900">
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
        </div>
      </div>
    </div>
  );
}