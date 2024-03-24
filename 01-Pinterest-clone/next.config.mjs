/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"]


// Dans ce cas précis, la configuration indique que les images peuvent être chargées à partir du domaine "lh3.googleusercontent.com". Cela signifie que si vous avez des images hébergées sur ce domaine, Next.js les autorisera à être affichées dans votre application. Cela peut être utile si vous avez des images stockées sur Google Cloud Storage et que vous souhaitez les utiliser dans votre application Next.js.


  }
};

export default nextConfig;
