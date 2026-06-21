import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jamia Siddiqiyyah – Islamic University & Charity",
    short_name: "Jamia Siddiqiyyah",
    description:
      "Jamia Siddiqiyyah: Premier Islamic educational institute, online madrasa, Quran academy, and global Islamic charity platform. Learn Quran, Islamic sciences, and support Islamic education.",
    start_url: "/",
    display: "standalone",
    background_color: "#004d40",
    theme_color: "#004d40",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "religion", "charity"],
    lang: "en",
    orientation: "portrait",
    scope: "/",
  };
}
