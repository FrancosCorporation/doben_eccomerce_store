"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Product from '../componentes/produto';
import Footer from '../componentes/footer';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  interface Product {
    titulo: string;
    precoMaior: number;
    precoMenor: number;
    urls: string[];
  }


  useEffect(() => {
    // Carregar os dados do arquivo JSON aqui
    fetch('../src/data/produtos.json') // Substitua pelo caminho correto para o seu arquivo JSON
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  }, []);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.main}>
        <div className={styles.div_products}>
          {products.map((product, index) => (
            <Product
              key={index}
              title={product.titulo}
              price={product.precoMaior}
              discountedPrice={product.precoMenor}
              imageUrls={product.urls}
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
