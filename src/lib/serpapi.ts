import axios from 'axios';

// Serper API'den dönen veri yapısı için interface
interface SerperResult {
    title?: string;
    link?: string;
    price?: string;
    image?: string;
    source?: string;
    snippet?: string;
}

interface SerperResponse {
    organic?: SerperResult[];
    shopping?: SerperResult[];
    results?: SerperResult[];
}

export async function searchProducts(query: string) {
    try {
        const apiKey = process.env.SERPER_API_KEY;

        if (!apiKey) {
            console.log('Serper API key bulunamadı, mock data dönülüyor');
            return getMockData();
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://google.serper.dev/search',
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ q: query })
        };

        const response = await axios.request<SerperResponse>(config);

        console.log('Serper API Response:', JSON.stringify(response.data, null, 2));

        if (!response.data) {
            throw new Error('API\'den boş yanıt alındı');
        }

        // Farklı veri yapılarını kontrol et (öncelik sırasına göre)
        let results: SerperResult[] = [];

        if (response.data.shopping && response.data.shopping.length > 0) {
            results = response.data.shopping;
        } else if (response.data.organic && response.data.organic.length > 0) {
            results = response.data.organic;
        } else if (response.data.results && response.data.results.length > 0) {
            results = response.data.results;
        } else {
            console.log('Herhangi bir sonuç bulunamadı, mock data dönülüyor');
            return getMockData();
        }

        // Geri dönen verileri uygun formata çevirin
        const shoppingResults = results.map((result: SerperResult) => ({
            title: result.title || 'Başlık yok',
            price: result.price || 'Fiyat belirtilmedi',
            link: result.link || '#',
            thumbnail: result.image || '/placeholder.jpg',
            source: result.source || 'Kaynak bilgisi yok'
        }));

        return { shopping_results: shoppingResults };

    } catch (error) {
        console.error('Serper API hatası:', error);
        return getMockData();
    }
}

// Mock data fonksiyonu
function getMockData() {
    return {
        shopping_results: [
            {
                title: "Logitech G502 Hero",
                price: "2.499 TL",
                link: "https://example.com/logitech-g502",
                thumbnail: "https://placehold.co/200x200/333/fff?text=Logitech",
                source: "Hepsiburada"
            },
            {
                title: "Razer DeathAdder V3",
                price: "1.899 TL",
                link: "https://example.com/razer-deathadder",
                thumbnail: "https://placehold.co/200x200/00ff00/000?text=Razer",
                source: "Trendyol"
            },
            {
                title: "Glorious Model O Wireless",
                price: "3.299 TL",
                link: "https://example.com/glorious-model-o",
                thumbnail: "https://placehold.co/200x200/ff6600/fff?text=Glorious",
                source: "N11"
            }
        ]
    };
}