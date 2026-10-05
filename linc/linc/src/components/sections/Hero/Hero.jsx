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
            <span>
              futuro da tecnologia.
            </span>
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
            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>
                <Radio size={21} />
              </div>

              <div>
                <strong>Automação NFC</strong>
                <span>
                  Tecnologia por aproximação
                </span>
              </div>
            </div>

            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>
                <BarChart3 size={21} />
              </div>

              <div>
                <strong>Landing Pages</strong>
                <span>
                  Experiências que convertem
                </span>
              </div>
            </div>

            <div className={styles.highlight}>
              <div className={styles.highlightIcon}>
                <ShieldCheck size={21} />
              </div>

              <div>
                <strong>Soluções inteligentes</strong>
                <span>
                  Tecnologia para resultados
                </span>
              </div>
            </div>
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

          <div className={styles.brandStage}>
            <div className={styles.brandSymbol}>
              <span className={styles.ring} />
              <span className={styles.ring} />
              <span className={styles.ring} />
              <span className={styles.ring} />

              <span className={styles.connector}>
                <i />
                <i />
              </span>
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