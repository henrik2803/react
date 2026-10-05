import {
  ArrowRight,
  BarChart3,
  Cloud,
  MessageCircle,
  Radio,
  ShieldCheck,
  Wifi,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import Button from "../../ui/Button/Button";

import { getWhatsAppLink } from "../../../constants/contact";

import styles from "./Hero.module.css";

const highlights = [
  {
    icon: Radio,
    title: "Automação NFC",
    description: "Tecnologia por aproximação",
  },
  {
    icon: BarChart3,
    title: "Landing Pages",
    description: "Experiências que convertem",
  },
  {
    icon: ShieldCheck,
    title: "Soluções inteligentes",
    description: "Tecnologia para resultados",
  },
];

function Hero() {
  return (
    <section
      id="inicio"
      className={styles.hero}
    >
      <Container className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />

            Tecnologia para empresas
          </div>

          <h1 className={styles.title}>
            Conectamos sua empresa ao{" "}
            <span>futuro da tecnologia.</span>
          </h1>

          <p className={styles.description}>
            Soluções inteligentes em automação NFC
            e experiências digitais para empresas
            que querem crescer com mais eficiência,
            tecnologia e presença digital.
          </p>

          <div className={styles.buttons}>
            <Button href="#solucoes">
              Conheça nossas soluções

              <ArrowRight size={18} />
            </Button>

            <Button
              href={getWhatsAppLink(
                "Olá! Gostaria de falar com um especialista da LINC."
              )}
              variant="secondary"
            >
              <MessageCircle size={18} />

              Falar com um especialista
            </Button>
          </div>

          <div className={styles.highlights}>
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className={styles.highlight}
                  key={item.title}
                >
                  <div className={styles.highlightIcon}>
                    <Icon size={21} />
                  </div>

                  <div className={styles.highlightContent}>
                    <strong>{item.title}</strong>

                    <span>{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={styles.visual}
          aria-hidden="true"
        >
          <div className={styles.glow} />

          <div
            className={`${styles.orbit} ${styles.orbitOne}`}
          />

          <div
            className={`${styles.orbit} ${styles.orbitTwo}`}
          />

          <div
            className={`${styles.orbit} ${styles.orbitThree}`}
          />

          <span
            className={`${styles.orbitDot} ${styles.dotOne}`}
          />

          <span
            className={`${styles.orbitDot} ${styles.dotTwo}`}
          />

          <span
            className={`${styles.orbitDot} ${styles.dotThree}`}
          />

          <div
            className={`${styles.floatingIcon} ${styles.wifi}`}
          >
            <Wifi />
          </div>

          <div
            className={`${styles.floatingIcon} ${styles.cloud}`}
          >
            <Cloud />
          </div>

          <div
            className={`${styles.floatingIcon} ${styles.security}`}
          >
            <ShieldCheck />
          </div>

          <div
            className={`${styles.floatingIcon} ${styles.chart}`}
          >
            <BarChart3 />
          </div>

          <div className={styles.techStage}>
            <div className={styles.techCore}>
              <span className={styles.coreRing} />
              <span className={styles.coreRing} />
              <span className={styles.coreRing} />
              <span className={styles.coreRing} />

              <div className={styles.coreCenter}>
                <Radio />
              </div>
            </div>

            <div className={styles.shadow} />

            <div className={styles.platform}>
              <div className={styles.platformLight} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
