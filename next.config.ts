// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Mevcut ayarlarınız
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://172.20.41.70:3000',
  ],
  images: {
    // next/image için izin verilen domain'ler
    domains: [
      // Yer tutucu/resim için
      'placehold.co',

      // Türkiye'den yaygın e-ticaret siteleri (örnekler)
      'cdn.akakce.com',
      'productimages.hepsiburada.net',
      'mcdn01.gittigidiyor.net',
      'dsquared2.mncdn.com',
      'www.technopat.net', // Forum avatarları/resimleri için
      'forum.donanimarsivi.com', // Forum avatarları/resimleri için
      'techolay.net', // Forum avatarları/resimleri için

      // Uluslararası yaygın siteler
      'm.media-amazon.com',
      'i.imgur.com',
      'upload.wikimedia.org', // Wikipedia resimleri

      // Serper API'den gelen örnek domain'ler (loglara dayalı)
      'www.reddit.com', // organic sonuçlardan gelen linkler için
      'www.youtube.com', // organic sonuçlardan gelen linkler için
      'www.razer.com', // organic sonuçlardan gelen linkler için
      'www.pcmag.com', // organic sonuçlardan gelen linkler için
      'www.cnet.com', // organic sonuçlardan gelen linkler için
      'www.bestbuy.com', // organic sonuçlardan gelen linkler için
      'www.newegg.com', // organic sonuçlardan gelen linkler için
      'www.startech.com.bd', // organic sonuçlardan gelen linkler için
      'www.ryanscomputers.com', // organic sonuçlardan gelen linkler için (varsayımsal)
      'www.czone.com.pk', // organic sonuçlardan gelen linkler için
      'endorfy.com', // organic sonuçlardan gelen linkler için
      'www.ebay.com', // organic sonuçlardan gelen linkler için
      'www.walmart.com', // organic sonuçlardan gelen linkler için
      'www.amazon.ca', // organic sonuçlardan gelen linkler için
      'www.officedepot.com.mx', // organic sonuçlardan gelen linkler için
      'tecnomundo.com.mx', // organic sonuçlardan gelen linkler için
      'compusistemasonline.com.mx', // organic sonuçlardan gelen linkler için
      'listado.mercadolibre.com.mx', // organic sonuçlardan gelen linkler için
      'xlstore.exelsolar.com', // organic sonuçlardan gelen linkler için

      // Daha fazla domain eklemek gerekebilir, API'den gelen gerçek sonuçlara göre güncellenmeli
    ],
    // Eğer daha karmaşık pattern'lar gerekiyorsa (joker karakter kullanımı)
    // remotePatterns kullanılabilir. Örnek:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '*.example.com', // example.com'un tüm alt domain'lerine izin verir
    //   },
    // ],
  },
  // Firebase deployment için önemli ayarlar
  eslint: {
    // Uyarılar deployment'i engellemesin (sadece hatalar engeller)
    // ignoreDuringBuilds: true,
  },
  // Firebase Hosting için output ayarı (Next.js 13+ App Router için önerilir)
  // output: 'standalone', // Bu, bağımsız bir çıktı oluşturur, Firebase için genellikle iyidir.
  // experimental: {
  //   // outputStandalone için gerekli olabilir
  //   // outputFileTracingRoot: join(__dirname, '../../'),
  // },
};

export default nextConfig;