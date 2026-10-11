'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import type { Product } from '@/types/product';
import styles from './produto.module.css';

const imageHosts = new Set(['images.tcdn.com.br', 'm.media-amazon.com']);

function isSupportedImage(source: string) {
  try {
    const imageUrl = new URL(source);
    return imageUrl.protocol === 'https:' && imageHosts.has(imageUrl.hostname);
  } catch {
    return false;
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(value);
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      {direction === 'left'
        ? <path d="M19 12H5m0 0 6 6m-6-6 6-6" />
        : <path d="M5 12h14m0 0-6-6m6 6-6 6" />}
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const [activeImage, setActiveImage] = useState(0);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const images = product.urls.filter(isSupportedImage);
  const currentImage = images[activeImage];
  const originalPrice = product.precoMaior;
  const salePrice = product.precoMenor;
  const hasDiscount = Number.isFinite(originalPrice) && Number.isFinite(salePrice)
    && originalPrice > 0 && salePrice >= 0 && salePrice < originalPrice;
  const displayedPrice = hasDiscount ? salePrice : originalPrice;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;
  const displayImage = currentImage && failedImage !== currentImage ? currentImage : null;

  function moveImage(direction: -1 | 1) {
    setActiveImage((index) => (index + direction + images.length) % images.length);
  }

  return (
    <article className={styles.productCard}>
      <div className={styles.imageFrame}>
        {displayImage ? (
          <button
            aria-label={`Ampliar foto de ${product.titulo}`}
            className={styles.imageButton}
            onClick={() => dialogRef.current?.showModal()}
            type="button"
          >
            <Image
              alt={`${product.titulo}, foto ${activeImage + 1} de ${images.length}`}
              className={styles.productImage}
              fill
              onError={() => setFailedImage(currentImage)}
              sizes="(max-width: 430px) 90vw, (max-width: 700px) 46vw, (max-width: 1000px) 30vw, 23vw"
              src={displayImage}
            />
            <span aria-hidden="true" className={styles.zoomHint}>Ampliar <span>↗</span></span>
          </button>
        ) : (
          <div aria-label={`Foto ilustrativa indisponível para ${product.titulo}`} className={styles.imagePlaceholder} role="img">
            <span aria-hidden="true" className={styles.placeholderSheets}><i /><i /><i /></span>
            <span className={styles.placeholderName}>DoBen</span>
            <span className={styles.placeholderCaption}>imagem ilustrativa</span>
          </div>
        )}
        {hasDiscount && <span className={styles.discountBadge}>{discountPercent}% OFF</span>}
        <span className={styles.categoryBadge}>Papelaria</span>
      </div>

      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{product.titulo}</h3>
        <div className={styles.prices}>
          {hasDiscount && <p className={styles.originalPrice}>De <s>{formatPrice(originalPrice)}</s></p>}
          <p className={styles.currentPrice}>
            <span>{hasDiscount ? 'Por' : 'Valor demonstrativo'}</span>
            <strong>{formatPrice(displayedPrice)}</strong>
          </p>
          <p className={styles.priceNote}>Preço ilustrativo</p>
        </div>

        {images.length > 1 && (
          <fieldset className={styles.galleryControls}>
            <legend className={styles.visuallyHidden}>Fotos de {product.titulo}</legend>
            <button aria-label="Foto anterior" className={styles.galleryArrow} onClick={() => moveImage(-1)} type="button">
              <ArrowIcon direction="left" />
            </button>
            <div className={styles.galleryDots}>
              {images.map((image, index) => (
                <button
                  aria-label={`Mostrar foto ${index + 1} de ${images.length}`}
                  aria-pressed={index === activeImage}
                  className={index === activeImage ? styles.activeDot : styles.galleryDot}
                  key={image}
                  onClick={() => setActiveImage(index)}
                  type="button"
                />
              ))}
            </div>
            <button aria-label="Próxima foto" className={styles.galleryArrow} onClick={() => moveImage(1)} type="button">
              <ArrowIcon direction="right" />
            </button>
          </fieldset>
        )}
      </div>

      <dialog
        aria-labelledby={dialogTitleId}
        className={styles.galleryDialog}
        ref={dialogRef}
      >
        <div className={styles.dialogHeader}>
          <h2 id={dialogTitleId}>Fotos de {product.titulo}</h2>
          <button aria-label="Fechar galeria" className={styles.closeButton} onClick={() => dialogRef.current?.close()} type="button">
            ×
          </button>
        </div>
        <div className={styles.dialogImageFrame}>
          {displayImage ? (
            <Image
              alt={`${product.titulo}, foto ${activeImage + 1} de ${images.length}`}
              className={styles.dialogImage}
              fill
              onError={() => setFailedImage(currentImage)}
              sizes="(max-width: 800px) 90vw, 760px"
              src={displayImage}
            />
          ) : (
            <div aria-label={`Foto ilustrativa indisponível para ${product.titulo}`} className={styles.imagePlaceholder} role="img">
              <span aria-hidden="true" className={styles.placeholderSheets}><i /><i /><i /></span>
              <span className={styles.placeholderName}>DoBen</span>
              <span className={styles.placeholderCaption}>imagem ilustrativa</span>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className={styles.dialogControls}>
            <button aria-label="Foto anterior" className={styles.dialogArrow} onClick={() => moveImage(-1)} type="button">
              <ArrowIcon direction="left" />
            </button>
            <span aria-live="polite">{activeImage + 1} / {images.length}</span>
            <button aria-label="Próxima foto" className={styles.dialogArrow} onClick={() => moveImage(1)} type="button">
              <ArrowIcon direction="right" />
            </button>
          </div>
        )}
      </dialog>
    </article>
  );
}
