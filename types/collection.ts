export type CollectionStatus = "COMING_SOON" | "AVAILABLE" | "ENDED";

export interface CollectionImage {
  src: string;
  alt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  imageAlt: string;
  coverPosition?: string;
  gallery?: CollectionImage[];
  description?: string;
  year?: number;
  status?: CollectionStatus;
  availableQuantity?: number | null;
}
