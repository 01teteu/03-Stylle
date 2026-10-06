import Image from "next/image";
import Link from "next/link";
import { collections, onzeCollection } from "@/data/collections";

export function FeaturedCollection() {
  const featured = collections[0];
  return (
    <section className="featured section-shell" id="colecao-destaque" aria-labelledby="featured-title">
      <div className="section-topline" data-reveal="line"><span>01 / COLEÇÃO EM DESTAQUE</span><span>03 STYLLE — ONZE</span></div>
      <div className="featured__grid">
        <div className="featured__copy" data-reveal="text">
          <p className="eyebrow">03 STYLLE / COLEÇÃO EM DESTAQUE</p>
          <h2 id="featured-title"><span>{featured.name}</span></h2>
          {featured.description && <p className="featured__description">{featured.description}</p>}
          {featured.availableQuantity != null && <p className="featured__availability">{featured.availableQuantity} peças disponíveis</p>}
          <Link className="text-link text-link--dark" href={`/colecoes/${featured.slug}`}>EXPLORAR COLEÇÃO <span aria-hidden="true">→</span></Link>
        </div>
        <figure className="featured__visual" data-reveal="image">
          <Image src={featured.coverImage} alt={featured.imageAlt} fill sizes="(max-width: 700px) 100vw, 48vw" />
          <figcaption>03 / ONZE</figcaption>
        </figure>
      </div>
      <div className="featured__bottom"><span>SEM FÓRMULA. SEM UNIFORME.</span><span>03 / ONZE</span></div>
    </section>
  );
}

export function Lookbook() {
  return (
    <section className="lookbook section-shell" id="lookbook" aria-labelledby="lookbook-title">
      <div className="section-topline section-topline--light" data-reveal="line"><span>02 / LOOKBOOK</span><span>DEPOIS QUE A CIDADE ACENDE</span></div>
      <div className="lookbook__intro" data-reveal="text">
        <p className="eyebrow">CAMPANHA 03</p>
        <h2 id="lookbook-title">A RUA <em>É</em> O CENÁRIO.</h2>
      </div>
      <figure className="lookbook__wide" data-reveal="image">
        <Image src="/images/03-stylle-lifestyle.webp" alt="Dois modelos em roupas amplas caminham por uma rua iluminada à noite" fill sizes="100vw" />
        <figcaption><span>FIG. 01 / TODOS CAMINHOS</span><span>03 STYLLE</span></figcaption>
      </figure>
      <div className="lookbook__lower">
        <div className="lookbook__note" data-reveal="text">
          <span className="lookbook__index">03</span>
          <p>Peças feitas para ocupar a cidade do seu jeito.</p>
          <span className="lookbook__vertical">VISTA 03 / SIGA SEU CAMINHO</span>
        </div>
        <figure className="lookbook__portrait" data-reveal="image">
          <Image src={onzeCollection.gallery[1].src} alt={onzeCollection.gallery[1].alt} fill sizes="(max-width: 700px) 90vw, 40vw" />
          <figcaption>FIG. 02 / ONZE</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CollectionsArchive() {
  return (
    <section className="archive section-shell" id="colecoes" aria-labelledby="archive-title">
      <div className="section-topline" data-reveal="line"><span>03 / ARQUIVO</span><span>COLEÇÕES 03 STYLLE</span></div>
      <div className="archive__heading" data-reveal="text">
        <p className="eyebrow">UMA HISTÓRIA EM DROPS</p>
        <h2 id="archive-title">COLEÇÕES<span> / 03</span></h2>
      </div>
      <div className="archive__list">
        {collections.map((collection) => (
          <Link className="archive__row" href={`/colecoes/${collection.slug}`} key={collection.id} data-reveal="row">
            <span className="archive__number">{collection.id}</span>
            <span className="archive__image"><Image src={collection.coverImage} alt={collection.imageAlt} fill sizes="(max-width: 700px) 78px, 180px" /></span>
            <span className="archive__name">{collection.name}</span>
            {(collection.year != null || collection.status === "ENDED" || collection.availableQuantity != null) && (
              <span className="archive__meta">
                {collection.year != null && <span>{collection.year}</span>}
                {collection.status === "ENDED" ? <span>ENCERRADA</span> : collection.availableQuantity != null ? <span>{collection.availableQuantity} peças disponíveis</span> : null}
              </span>
            )}
            <span className="archive__arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="manifesto section-shell" id="sobre" aria-labelledby="manifesto-title">
      <div className="section-topline" data-reveal="line"><span>04 / MANIFESTO</span><span>03 NÃO É DESTINO. É DIREÇÃO.</span></div>
      <p className="eyebrow manifesto__eyebrow" data-reveal="text">PARA QUEM NÃO CABE NO MOLDE</p>
      <h2 id="manifesto-title" data-reveal="text">NÃO SIGA<br />O PADRÃO<span>.</span></h2>
      <div className="manifesto__bottom" data-reveal="text">
        <p>Vista o que te move.<br />O resto, deixe na rua.</p>
        <span>VISTA 03.</span>
      </div>
    </section>
  );
}

export function SocialFooter() {
  return (
    <>
      <section className="social section-shell" id="contato" aria-labelledby="social-title">
        <div className="section-topline section-topline--light" data-reveal="line"><span>05 / NA RUA, TODOS OS DIAS</span><span>03 STYLLE / SOCIAL</span></div>
        <div className="social__body">
          <div data-reveal="text">
            <p className="eyebrow">ACOMPANHE OS PRÓXIMOS DROPS</p>
            <h2 id="social-title">ENCONTRE<br />A 03.</h2>
            <a className="social__handle" href="https://www.instagram.com/use03stylle/" target="_blank" rel="noopener noreferrer">@use03stylle <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="social__visual" data-reveal="image">
            <Image src={onzeCollection.gallery[2].src} alt={onzeCollection.gallery[2].alt} fill sizes="(max-width: 700px) 100vw, 40vw" />
          </figure>
        </div>
      </section>
      <footer className="footer section-shell">
        <div className="footer__main">
          <a className="footer__brand" href="#inicio" aria-label="03 STYLLE, voltar ao início">03<span>STYLLE</span></a>
          <nav aria-label="Navegação do rodapé"><a href="#colecoes">COLEÇÕES</a><a href="#sobre">SOBRE</a><a href="#contato">CONTATO</a></nav>
        </div>
        <div className="footer__bottom"><span>Todos caminhos te levam a 03.</span><a href="https://www.instagram.com/use03stylle/" target="_blank" rel="noopener noreferrer">@use03stylle ↗</a><span>© 03 STYLLE 2026</span></div>
      </footer>
    </>
  );
}
