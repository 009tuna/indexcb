const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://172.20.41.70:3000"],
  images: {
    unoptimized: false, // varsayılan kapalı olduğundan açıkça false yapıyoruz
  },
};
export default nextConfig;
