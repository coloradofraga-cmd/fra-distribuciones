import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/auth/", "/checkout/", "/perfil/"],
    },
    sitemap: "https://fra-distribuciones.vercel.app/sitemap.xml",
  };
}
