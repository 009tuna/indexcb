import { searchProducts } from '@/lib/serpapi';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Arama sorgusu:', query);
    const results = await searchProducts(query);
    console.log('Dönen sonuçlar:', JSON.stringify(results, null, 2));

    return new Response(JSON.stringify({
      products: results.shopping_results || [],
      totalResults: results.shopping_results?.length || 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: 'Search failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}