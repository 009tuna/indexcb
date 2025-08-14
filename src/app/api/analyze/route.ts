// src/app/api/analyze/route.ts
import { analyzeProducts } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) { // POST kullanmak daha uygun
  try {
    const body = await request.json();
    const { products } = body; // Chat'ten gelen ürün listesi

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: 'Geçersiz ürün listesi' }, { status: 400 });
    }

    console.log(`Analiz için ${products.length} ürün alındı.`);
    const analysis = await analyzeProducts(products);
    console.log('Gemini analizi tamamlandı.');

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('API Route - Gemini API hatası:', error);
    // Hatanın türüne göre daha spesifik mesaj verilebilir
    let message = 'Analiz yapılırken bir hata oluştu.';
    if (error instanceof Error) {
        message = error.message;
        // 401/403 hatası API key ile ilgili olabilir
        if (message.includes('API key') || message.includes('401') || message.includes('403')) {
            message = 'Gemini API anahtarı geçersiz veya eksik.';
        }
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}