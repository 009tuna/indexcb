// src/app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-md">
              <span className="text-lg font-bold">AI</span>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight">Compare</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Akıllı Ürün Karşılaştırma</div>
            </div>
          </div>
          <nav className="flex gap-2">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow dark:bg-slate-100 dark:text-slate-900"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/chat"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Chatbot
            </Link>
            <Link
              href="/search"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Manuel Sorgu
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Akıllı Ürün <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Karşılaştırma</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl">
            Doğal dilde soru sor, kriter belirle ya da manuel sorgu yap — en iyi ürünleri
            <strong className="text-indigo-600 dark:text-indigo-400"> kaynaklarıyla</strong> birlikte sıralayalım.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/chat"
              className="rounded-2xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-95 active:scale-95 dark:bg-white dark:text-slate-900"
            >
              🚀 Chatbot ile Başla
            </Link>
            <Link
              href="/search"
              className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold shadow-sm hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-900"
            >
              🔍 Manuel Sorgu
            </Link>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 text-3xl">🤖</div>
            <h3 className="mb-2 text-xl font-bold">Chatbot</h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Doğal dilde sor, yapay zeka destekli analiz al.
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Fiyat bandına göre öneriler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Artı/eksi ve kısa özet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Kaynak linkleri ile doğrulama</span>
              </li>
            </ul>
            <Link
              href="/chat"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 active:scale-95 dark:bg-white dark:text-slate-900"
            >
              Chatbot&#39;a Git {/* &#39; escapes the apostrophe */}
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 text-3xl">🔍</div>
            <h3 className="mb-2 text-xl font-bold">Manuel Sorgu</h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Kriter ve bütçe belirleyerek detaylı arama yap.
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Ağırlık, DPI, bağlantı gibi filtreler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Fiyat bandı karşılaştırmaları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Karşılaştırma listesine ekle</span>
              </li>
            </ul>
            <Link
              href="/search"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 active:scale-95 dark:bg-white dark:text-slate-900"
            >
              Manuel Sorguya Git
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 text-3xl">💡</div>
            <h3 className="mb-2 text-xl font-bold">Akıllı Analiz</h3>
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Yapay zeka destekli ürün analizi ve öneriler.
            </p>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Gerçek zamanlı web araması</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>LLM destekli özetleme</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Kaynak doğrulama ve fiyat etiketleri</span>
              </li>
            </ul>
            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Yakında...
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 p-8 dark:from-indigo-500/20 dark:to-cyan-400/20">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Nasıl Çalışır?</h2>
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">1</div>
                  <h3 className="font-semibold">Sorgula</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Kriterlerini belirle</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white">2</div>
                  <h3 className="font-semibold">Analiz Et</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">AI önerilerini incele</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">3</div>
                  <h3 className="font-semibold">Karar Ver</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">En iyi ürünü seç</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p className="text-slate-500">&#169; {new Date().getFullYear()} Compare — Akıllı Ürün Karşılaştırma</p> {/* &copy; replaced with &#169; */}
          <div className="flex gap-4">
            <Link href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
              Gizlilik
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
              Koşullar
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
              İletişim
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}