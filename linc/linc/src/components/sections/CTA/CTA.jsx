import {
  ArrowUpRight,
  Check,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import { getWhatsAppLink } from "../../../constants/contact";

import styles from "./CTA.module.css";

const features = [
  {
    icon: Sparkles,
    text: "Soluções inovadoras",
  },
  {
    icon: Target,
    text: "Foco no seu negócio",
  },
  {
    icon: ShieldCheck,
    text: "Segurança e confiança",
  },
  {
    icon: Check,
    text: "Suporte especializado",
  },
];

function CTA() {
  return (
    <section
      id="contato"
      className={styles.section}
    >
      <Container>
        <div className={styles.cta}>
          <div className={styles.gridPattern} />
          <div className={styles.glowOne} />
          <div className={styles.glowTwo} />

          <div className={styles.content}>
            <span className={styles.badge}>
              <span />
              VAMOS EVOLUIR JUNTOS
            </span>

            <h2>
              Sua empresa está
              <br />
              pronta para
              <br />
              <strong>evoluir?</strong>
            </h2>

            <p>
              Vamos construir juntos uma solução tecnológica
              sob medida para impulsionar o seu negócio.
            </p>

            <a
              className={styles.button}
              href={getWhatsAppLink(
                "Olá! Quero conversar sobre uma solução para minha empresa."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={21} />

              Falar no WhatsApp

              <ArrowUpRight size={18} />
            </a>
          </div>

          <div
            className={styles.visual}
            aria-hidden="true"
          >
            <div className={styles.orbitOne} />
            <div className={styles.orbitTwo} />
            <div className={styles.orbitThree} />

            <div className={styles.symbol}>
              <span className={styles.ringOne} />
              <span className={styles.ringTwo} />
              <span className={styles.ringThree} />
              <span className={styles.ringFour} />

              <div className={styles.connector}>
                <span />
                <span />
              </div>
            </div>

            <div className={styles.platform}>
              <div />
            </div>
          </div>

          <div className={styles.features}>
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.text}>
                  <span>
                    <Icon size={18} />
                  </span>

                  {feature.text}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTA;