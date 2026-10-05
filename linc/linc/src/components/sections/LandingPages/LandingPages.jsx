import {
  Gauge,
  MonitorSmartphone,
  Palette,
  Smartphone,
  TrendingUp,
  Zap,
} from "lucide-react";

import Container from "../../ui/Container/Container";

import styles from "./LandingPages.module.css";

const benefits = [
  {
    icon: Zap,
    title: "Performance",
    description:
      "Página rápida que gera resultados.",
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    description:
      "Perfeita em qualquer dispositivo.",
  },
  {
    icon: Palette,
    title: "Design Premium",
    description:
      "Layouts modernos que transmitem confiança.",
  },
  {
    icon: TrendingUp,
    title: "Conversão",
    description:
      "Estratégia focada em gerar mais clientes.",
  },
];

function LandingPages() {
  return (
    <section
      id="landing-pages"
      className={styles.section}
    >
      <Container className={styles.container}>
                  <div
            className={styles.visual}
            data-reveal="left"
            aria-hidden="true"
          >
          <div className={styles.glow} />

          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              <div className={styles.browserBar}>
                <span />
                <span />
                <span />

                <div />
              </div>

              <div className={styles.sitePreview}>
                <div className={styles.previewNav}>
                  <strong>LINC</strong>

                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className={styles.previewHero}>
                  <div>
                    <small>
                      SOLUÇÕES DIGITAIS
                    </small>

                    <h3>
                      Tecnologia que
                      <br />
                      gera resultados.
                    </h3>

                    <p />

                    <button
                      type="button"
                      tabIndex="-1"
                    />
                  </div>

                  <div className={styles.previewGraphic}>
                    <TrendingUp size={35} />
                  </div>
                </div>

                <div className={styles.previewBoxes}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            <div className={styles.laptopBase} />
          </div>

          <div className={styles.phone}>
            <div className={styles.phoneScreen}>
              <MonitorSmartphone size={27} />

              <span />

              <span />

              <button
                type="button"
                tabIndex="-1"
              />
            </div>
          </div>

          <div className={styles.performance}>
            <Gauge size={20} />

            <div>
              <strong>98</strong>
              <span>Performance</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.badge}>
            <MonitorSmartphone size={15} />
            LINC WEB
          </span>

          <h2>
            Landing Pages
            <br />
            <span>criadas para vender.</span>
          </h2>

          <p className={styles.description}>
            Não basta ter um site bonito. Criamos
            páginas rápidas, responsivas e
            desenvolvidas para aumentar a conversão
            do seu negócio.
          </p>

          <div className={styles.benefits}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className={styles.benefit}
                  key={benefit.title}
                >
                  <div className={styles.benefitIcon}>
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3>{benefit.title}</h3>

                    <p>
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LandingPages;