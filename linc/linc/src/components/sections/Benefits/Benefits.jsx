import {
  Gauge,
  Headphones,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import styles from "./Benefits.module.css";

const benefits = [
  {
    icon: Lightbulb,
    title: "Soluções inteligentes",
    description:
      "Tecnologia aplicada de forma estratégica para resolver problemas reais.",
  },
  {
    icon: Users,
    title: "Atendimento personalizado",
    description:
      "Cada projeto é desenvolvido considerando as necessidades do seu negócio.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e confiança",
    description:
      "Soluções desenvolvidas com foco em qualidade, estabilidade e segurança.",
  },
  {
    icon: Headphones,
    title: "Suporte especializado",
    description:
      "Acompanhamento próximo antes, durante e depois da implementação.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Experiências rápidas, eficientes e preparadas para gerar resultados.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia moderna",
    description:
      "Ferramentas e experiências digitais alinhadas às necessidades atuais.",
  },
];

function Benefits() {
  return (
    <section className={styles.section}>
      <Container>
        <header className={styles.heading}>
          <span>POR QUE A LINC?</span>

          <h2>
            Tecnologia com propósito.
          </h2>

          <p>
            Mais do que implementar tecnologia, buscamos criar
            soluções que façam sentido para o seu negócio.
          </p>
        </header>

        <div className={styles.grid}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                className={styles.card}
                key={benefit.title}
              >
                <div className={styles.icon}>
                  <Icon size={24} />
                </div>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Benefits;