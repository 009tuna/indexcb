// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Product interface'i tanımlandı
interface Product {
    title: string;
    price: string;
    link: string;
    thumbnail: string;
    source: string;
    // Diğer alanlar varsa buraya eklenebilir, ama sadece Gemini fonksiyonunda kullanacağımız için gerekli olanları alıyoruz
    // Ağırlık ve DPI gibi alanlar API'den gelmiyor olabilir, prompt içinde nasıl kullanıldığına dikkat edin.
}

export async function analyzeProducts(products: Product[]) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            const errorMsg = 'Gemini API key bulunamadı. .env.local dosyasına GEMINI_API_KEY ekleyin.';
            console.error(errorMsg); // Cloud Function loglarında görünür
            throw new Error(errorMsg); // Çağıran fonksiyona fırlatılır
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `Bu mouse ürünlerini karşılaştır ve öner. Fiyat, ağırlık, DPI ve özellikler açısından analiz et:

${JSON.stringify(products.slice(0, 5), null, 2)}

Lütfen şu formatı kullan:
1. En iyi fiyat/performans oranı: [ürün adı]
2. En hafifi: [ürün adı] ([ağırlık]g) - (Not: Ağırlık bilgisi mevcut değilse "bilgi yok" yazın)
3. En yüksek DPI: [ürün adı] ([DPI]) - (Not: DPI bilgisi mevcut değilse "bilgi yok" yazın)
4. Öneri: [kısaca öneri]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        console.error('Gemini API hatası (lib):', error); // Cloud Function loglarında görünür
        // Hata mesajını çağıran fonksiyona ilet
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Bilinmeyen Gemini API hatası');
        }
    }
}