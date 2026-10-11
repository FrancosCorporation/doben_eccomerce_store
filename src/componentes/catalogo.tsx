'use client';

import { useState } from 'react';
import ProductCard from './produto';
import type { Product } from '@/types/product';
import styles from './catalogo.module.css';

export default function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const visibleProducts = normalizedQuery
    ? products.filter((product) => product.titulo.toLocaleLowerCase('pt-BR').includes(normalizedQuery))
    : products;
  const resultLabel = visibleProducts.length === 1 ? 'produto' : 'produtos';

  return (
    <div className={styles.catalog}>
      <div className={styles.toolbar}>
        <label className={styles.searchBox}>
          <span className={styles.visuallyHidden}>Buscar produtos pelo nome</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
            <path d="m16 16 4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          </svg>
          <input
            autoComplete="off"
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="O que você está procurando?"
            type="search"
            value={query}
          />
          {query && (
            <button aria-label="Limpar busca" className={styles.clearSearch} onClick={() => setQuery('')} type="button">
              ×
            </button>
          )}
        </label>
        <p aria-live="polite" className={styles.resultCount}>
          {visibleProducts.length} {resultLabel}
        </p>
      </div>

      {visibleProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {visibleProducts.map((product) => <ProductCard key={product.titulo} product={product} />)}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span aria-hidden="true">⌕</span>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente buscar por outro nome ou veja a coleção completa.</p>
          <button onClick={() => setQuery('')} type="button">Mostrar todos os produtos</button>
        </div>
      )}
    </div>
  );
}
