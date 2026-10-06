import Image from "next/image";
import { SiteHeader } from "@/components/home/site-header";
import { ScrollReveal } from "@/components/home/reveal";
import { FeaturedCollection, Lookbook, CollectionsArchive, Manifesto, SocialFooter } from "@/components/home/home-sections";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <Image
          src="/images/03-stylle-hero.webp"
          alt="Modelo em uma rua iluminada à noite, vestindo camiseta oversized azul"
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__shade" aria-hidden="true" />
        <SiteHeader />
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">03 STYLLE / COLEÇÕES</p>
          <h1 id="hero-title"><span>NÃO SIGA</span><span>O PADRÃO.</span><span className="hero__last-line">VISTA 03.</span></h1>
          <a className="text-link hero__cta" href="#colecao-destaque">EXPLORAR COLEÇÃO <span aria-hidden="true">→</span></a>
        </div>
        <div className="hero__bottom"><span>MODERN STREETWEAR</span><span>DESÇA PARA EXPLORAR&nbsp; ↓</span></div>
      </section>
      <FeaturedCollection />
      <Lookbook />
      <CollectionsArchive />
      <Manifesto />
      <SocialFooter />
    </main>
  );
}
