import {
  Check,
  Gauge,
  Palette,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import styles from "./Comparison.module.css";

const withoutLanding = [
  "Poucos contatos",
  "Site lento",
  "Baixa conversão",
  "Visual amador",
];

const withLinc = [
  "Mais clientes",
  "Alta velocidade",
  "Design Premium",
  "Conversão otimizada",
];

function Comparison() {
  return (
    <section className={styles.section}>
      <Container>
        <header className={styles.heading}>
          <span>RESULTADOS</span>

          <h2>
            A diferença de uma página
            <strong> pensada para converter.</strong>
          </h2>

          <p>
            Design, performance e estratégia trabalhando juntos
            para transformar visitantes em oportunidades.
          </p>
        </header>

        <div className={styles.comparison}>
          <article className={`${styles.card} ${styles.negative}`}>
            <div className={styles.cardHeader}>
              <div className={styles.negativeIcon}>
                <TrendingDown size={25} />
              </div>

              <div>
                <span>ANTES</span>
                <h3>Sem Landing</h3>
              </div>
            </div>

            <div className={styles.items}>
              {withoutLanding.map((item) => (
                <div className={styles.item} key={item}>
                  <span className={styles.xIcon}>
                    <X size={17} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className={styles.vs}>VS</div>

          <article className={`${styles.card} ${styles.positive}`}>
            <div className={styles.recommended}>
              LINC
            </div>

            <div className={styles.cardHeader}>
              <div className={styles.positiveIcon}>
                <TrendingUp size={25} />
              </div>

              <div>
                <span>DEPOIS</span>
                <h3>Com a LINC</h3>
              </div>
            </div>

            <div className={styles.items}>
              {withLinc.map((item) => (
                <div className={styles.item} key={item}>
                  <span className={styles.checkIcon}>
                    <Check size={17} />
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className={styles.metrics}>
          <div>
            <Gauge />
            <span>Performance</span>
          </div>

          <div>
            <Zap />
            <span>Velocidade</span>
          </div>

          <div>
            <Palette />
            <span>Design</span>
          </div>

          <div>
            <TrendingUp />
            <span>Conversão</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Comparison;