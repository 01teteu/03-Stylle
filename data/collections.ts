import type { Collection } from "@/types/collection";

export const onzeCollection = {
  id: "01",
  slug: "onze",
  name: "ONZE",
  coverImage: "/images/collections/onze/campaign-main.webp",
  imageAlt: "Campanha ONZE da 03 STYLLE com cinco modelos em um auditório",
  coverPosition: "50% 30%",
  gallery: [
    {
      src: "/images/collections/onze/campaign-main.webp",
      alt: "Campanha ONZE da 03 STYLLE com cinco modelos em um auditório",
    },
    {
      src: "/images/collections/onze/campaign-neymar.webp",
      alt: "Modelo usando camiseta preta gráfica da coleção ONZE",
    },
    {
      src: "/images/collections/onze/campaign-yellow-graphic.webp",
      alt: "Modelo usando camiseta preta com estampa amarela da coleção ONZE",
    },
  ],
  description: "Brasil, futebol e rua.",
} satisfies Collection;

export const demoCollections: Collection[] = [
  {
    id: "02",
    slug: "essentials-03",
    name: "ESSENTIALS 03",
    year: 2026,
    coverImage: "/images/03-stylle-detail.webp",
    imageAlt: "Detalhe de camiseta oversized azul em ambiente urbano noturno",
    description: "Silhuetas amplas para todos os caminhos.",
    status: "AVAILABLE",
    availableQuantity: 18,
  },
  {
    id: "03",
    slug: "origins",
    name: "ORIGINS",
    year: 2025,
    coverImage: "/images/03-stylle-hero.webp",
    imageAlt: "Modelo de camiseta azul em campanha urbana noturna",
    description: "Onde tudo começou.",
    status: "ENDED",
    availableQuantity: null,
  },
];

export const collections: Collection[] = [onzeCollection, ...demoCollections];
