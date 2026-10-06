"use client";

import { useState } from "react";

const links = [
  { href: "#colecoes", label: "COLEÇÕES" },
  { href: "#sobre", label: "SOBRE" },
  { href: "#contato", label: "CONTATO" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="03 STYLLE, início" onClick={() => setOpen(false)}>
        <span className="brand__number">03</span><span className="brand__name">STYLLE</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-controls="mobile-navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "FECHAR" : "MENU"}</span>
        <span className={open ? "menu-icon menu-icon--open" : "menu-icon"} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="mobile-navigation" className={open ? "mobile-nav mobile-nav--open" : "mobile-nav"} aria-label="Navegação móvel" inert={!open}>
        {links.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}</a>)}
        <a className="mobile-nav__social" href="https://www.instagram.com/use03stylle/" target="_blank" rel="noopener noreferrer">@use03stylle ↗</a>
      </nav>
    </header>
  );
}
