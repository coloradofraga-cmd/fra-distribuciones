import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fraga Distribuciones",
    short_name: "Fraga",
    description: "Productos de limpieza para el hogar con entrega a domicilio.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f5",
    theme_color: "#00362e",
    orientation: "portrait",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
