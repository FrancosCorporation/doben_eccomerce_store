import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <a aria-label="DoBen — voltar ao início" className={styles.brand} href="#inicio">
          <span aria-hidden="true" className={styles.brandMark}>D</span>
          <span className={styles.brandLabel}>DoBen<span className={styles.brandCaption}>papelaria & ideias</span></span>
        </a>
        <p>Um espaço de demonstração para ideias que começam no papel.</p>
        <a className={styles.backToTop} href="#inicio">Voltar ao início <span aria-hidden="true" className={styles.backArrow}>↑</span></a>
      </div>
      <div className={styles.footerBottom}>
        <span>Catálogo e valores ilustrativos · sem vendas ou pagamentos</span>
        <a href="https://github.com/FrancosCorporation" rel="noreferrer" target="_blank">Um projeto FrancosCorp</a>
      </div>
    </footer>
  );
}
