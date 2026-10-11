import Catalog from '@/componentes/catalogo';
import Footer from '@/componentes/footer';
import products from '@/data/produtos.json';
import type { Product } from '@/types/product';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.siteShell}>
      <header className={styles.siteHeader}>
        <a aria-label="DoBen — início" className={styles.brand} href="#inicio">
          <span aria-hidden="true" className={styles.brandMark}>D</span>
          <span className={styles.brandName}>DoBen<span>papelaria & ideias</span></span>
        </a>
        <nav aria-label="Navegação principal" className={styles.navigation}>
          <a href="#catalogo">Catálogo</a>
          <a className={styles.navCta} href="#sobre-a-vitrine">Sobre a vitrine</a>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-title" className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span /> PAPELARIA PARA IDEIAS EM MOVIMENTO</p>
            <h1 id="hero-title">Seu próximo plano começa <span className={styles.accentText}>no papel.</span></h1>
            <p className={styles.heroIntro}>
              Cadernos, cores e pequenos detalhes para acompanhar seus estudos, projetos e novas ideias.
            </p>
            <a className={styles.primaryButton} href="#catalogo">
              Explorar a vitrine <span aria-hidden="true" className={styles.primaryButtonIcon}>↘</span>
            </a>
            <p className={styles.demoNotice}>
              <span aria-hidden="true" className={styles.noticeIcon}>✳</span> Vitrine demonstrativa: os valores são exemplos e não há finalização de pedidos.
            </p>
          </div>

          <div aria-hidden="true" className={styles.heroArtwork}>
            <div className={styles.artCircle} />
            <div className={styles.artPaperBack} />
            <div className={styles.artNotebook}>
              <span className={styles.notebookLabel}>DO BEN · 01</span>
              <strong>ideias<br />ganham<br /><em>forma.</em></strong>
              <span className={styles.notebookRule} />
              <span className={styles.notebookNote}>um dia de cada vez</span>
            </div>
            <div className={styles.artSticky}><span>anote<br />o que<br />importa</span><i /></div>
            <span className={styles.artSparkle}>✳</span>
            <span className={styles.artCaption}>um espaço para criar</span>
          </div>
        </section>

        <section aria-labelledby="catalog-title" className={styles.catalogSection} id="catalogo">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}><span /> ESCOLHAS PARA CRIAR</p>
              <h2 id="catalog-title">Pequenas coisas,<br /><span className={styles.accentText}>grandes ideias.</span></h2>
            </div>
            <p className={styles.sectionIntro}>
              Explore a coleção de papelaria e encontre inspiração para o próximo capítulo.
            </p>
          </div>

          <Catalog products={products as Product[]} />
        </section>

        <section aria-labelledby="demo-title" className={styles.demoSection} id="sobre-a-vitrine">
          <span aria-hidden="true" className={styles.demoIcon}>i</span>
          <div>
            <h2 id="demo-title">Uma vitrine de demonstração</h2>
            <p>
              Este projeto apresenta uma coleção de exemplo. Produtos, preços e algumas imagens são ilustrativos; não há carrinho, estoque ou processamento de pagamentos.
            </p>
          </div>
          <a href="#catalogo">Voltar ao catálogo <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
