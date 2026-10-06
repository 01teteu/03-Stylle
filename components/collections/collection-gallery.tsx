"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type WheelEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { CollectionImage } from "@/types/collection";

const AUTOPLAY_DELAY = 5000;
const MANUAL_PAUSE = 8000;

interface CollectionGalleryProps {
  images: CollectionImage[];
  collectionName: string;
}

export function CollectionGallery({ images, collectionName }: CollectionGalleryProps) {
  const [viewportRef, api] = useEmblaCarousel({ align: "center", loop: images.length > 1 });
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);
  const pauseUntilRef = useRef(0);
  const interactingRef = useRef(false);
  const visibleRef = useRef(false);
  const pageVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const lastWheelRef = useRef(0);
  const scheduleRef = useRef<() => void>(() => {});

  const pauseForManualInput = useCallback(() => {
    pauseUntilRef.current = Date.now() + MANUAL_PAUSE;
    scheduleRef.current();
  }, []);

  const navigate = useCallback((direction: "previous" | "next") => {
    if (!api || images.length < 2) return;
    pauseForManualInput();
    if (direction === "next") api.scrollNext(reducedMotionRef.current);
    else api.scrollPrev(reducedMotionRef.current);
  }, [api, images.length, pauseForManualInput]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(event.key === "ArrowRight" ? "next" : "previous");
    } else if (api && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      pauseForManualInput();
      api.scrollTo(event.key === "Home" ? 0 : images.length - 1, reducedMotionRef.current);
    }
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 12) return;
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelRef.current < 900) return;
    lastWheelRef.current = now;
    navigate(event.deltaX > 0 ? "next" : "previous");
  };

  useEffect(() => {
    if (!api || !sectionRef.current || images.length < 2) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    pageVisibleRef.current = document.visibilityState === "visible";
    reducedMotionRef.current = motionQuery.matches;

    const clearTimer = () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    const schedule = () => {
      clearTimer();
      if (reducedMotionRef.current || !visibleRef.current || !pageVisibleRef.current || interactingRef.current) return;
      const wait = Math.max(AUTOPLAY_DELAY, pauseUntilRef.current - Date.now());
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        if (!interactingRef.current && visibleRef.current && pageVisibleRef.current && !reducedMotionRef.current) {
          api.scrollNext();
        }
        schedule();
      }, wait);
    };

    scheduleRef.current = schedule;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    const onPointerDown = () => {
      interactingRef.current = true;
      clearTimer();
    };
    const onPointerUp = () => {
      interactingRef.current = false;
      pauseForManualInput();
    };
    const onMotionChange = () => {
      reducedMotionRef.current = motionQuery.matches;
      api.reInit({ align: "center", loop: true, duration: motionQuery.matches ? 0 : 25 });
      schedule();
    };
    const onVisibilityChange = () => {
      pageVisibleRef.current = document.visibilityState === "visible";
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      schedule();
    }, { threshold: 0.15 });

    observer.observe(sectionRef.current);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.on("pointerDown", onPointerDown);
    api.on("pointerUp", onPointerUp);
    motionQuery.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onSelect();
    if (motionQuery.matches) onMotionChange();

    return () => {
      clearTimer();
      scheduleRef.current = () => {};
      observer.disconnect();
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      api.off("pointerDown", onPointerDown);
      api.off("pointerUp", onPointerUp);
      motionQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [api, images.length, pauseForManualInput]);

  if (images.length === 0) return null;

  return (
    <section className="collection-gallery" ref={sectionRef} aria-labelledby="collection-gallery-title">
      <div className="collection-gallery__topline section-shell">
        <h2 id="collection-gallery-title">GALERIA</h2>
        <span>03 STYLLE / {collectionName}</span>
      </div>
      <div
        className="collection-gallery__viewport"
        ref={viewportRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label={`Galeria da coleção ${collectionName}. Use as setas esquerda e direita para navegar.`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        <div className="collection-gallery__track">
          {images.map((image, index) => (
            <figure className="collection-gallery__slide" key={`${image.src}-${index}`} role="group" aria-roledescription="imagem" aria-label={`${index + 1} de ${images.length}`}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 88vw, (max-width: 1364px) 55vw, 750px" style={{ objectFit: "contain" }} />
            </figure>
          ))}
        </div>
      </div>
      <div className="collection-gallery__navigation section-shell">
        <span className="collection-gallery__count" aria-label={`Imagem ${current + 1} de ${images.length}`}>
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        {images.length > 1 && (
          <div className="collection-gallery__actions">
            <button type="button" onClick={() => navigate("previous")} aria-label="Imagem anterior">←</button>
            <button type="button" onClick={() => navigate("next")} aria-label="Próxima imagem">→</button>
          </div>
        )}
      </div>
    </section>
  );
}
