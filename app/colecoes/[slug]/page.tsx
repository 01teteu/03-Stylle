import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "@/data/collections";
import { CollectionGallery } from "@/components/collections/collection-gallery";

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();

  return (
    <main className="collection-page">
      <header className="collection-page__header">
        <Link className="brand" href="/" aria-label="03 STYLLE, voltar para a Home"><span className="brand__number">03</span><span className="brand__name">STYLLE</span></Link>
        <Link href="/#colecoes">← TODAS AS COLEÇÕES</Link>
      </header>
      <div className="collection-page__visual">
        <Image src={collection.coverImage} alt={collection.imageAlt} fill priority sizes="100vw" style={{ objectPosition: collection.coverPosition }} />
        <div className="collection-page__shade" />
        <div className="collection-page__content">
          <p className="eyebrow">COLEÇÃO {collection.id}{collection.year != null ? ` / ${collection.year}` : ""}</p>
          <h1>{collection.name}</h1>
          {collection.description && <p>{collection.description}</p>}
          {collection.status === "ENDED" ? <span>ENCERRADA</span> : collection.availableQuantity != null ? <span>{collection.availableQuantity} peças disponíveis</span> : null}
        </div>
      </div>
      {collection.gallery && collection.gallery.length > 0 && <CollectionGallery images={collection.gallery} collectionName={collection.name} />}
      <footer className="collection-page__footer"><span>Todos caminhos te levam a 03.</span><a href="https://www.instagram.com/use03stylle/" target="_blank" rel="noopener noreferrer">@use03stylle ↗</a></footer>
    </main>
  );
}
