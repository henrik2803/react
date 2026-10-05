import {
  Code2,
  FileSearch,
  GraduationCap,
  Headphones,
  Palette,
  Radio,
  Rocket,
  Search,
  Settings,
  TrendingUp,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import styles from "./Process.module.css";

const nfcSteps = [
  {
    icon: Search,
    title: "Diagnóstico",
    description:
      "Entendemos suas necessidades e identificamos oportunidades de automação.",
  },
  {
    icon: FileSearch,
    title: "Planejamento",
    description:
      "Criamos um plano estratégico personalizado para o seu negócio.",
  },
  {
    icon: Settings,
    title: "Implantação",
    description:
      "Implementamos a solução NFC com qualidade, segurança e eficiência.",
  },
  {
    icon: GraduationCap,
    title: "Treinamento",
    description:
      "Capacitamos sua equipe para utilizar a solução de forma prática e eficiente.",
  },
  {
    icon: Headphones,
    title: "Suporte",
    description:
      "Oferecemos suporte contínuo para garantir o melhor desempenho.",
  },
];

const webSteps = [
  {
    icon: FileSearch,
    title: "Briefing",
    description:
      "Entendemos seu objetivo, público e diferenciais para criar a estratégia ideal.",
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "Criamos um layout moderno, atrativo e focado na melhor experiência do usuário.",
  },
  {
    icon: Code2,
    title: "Desenvolvimento",
    description:
      "Desenvolvemos a landing page com tecnologia moderna e alta performance.",
  },
  {
    icon: Rocket,
    title: "Publicação",
    description:
      "Publicamos sua página com todos os testes e ajustes necessários.",
  },
  {
    icon: TrendingUp,
    title: "Otimização",
    description:
      "Monitoramos e otimizamos continuamente para aumentar conversões e resultados.",
  },
];

function ProcessStep({ step, number }) {
  const Icon = step.icon;

  return (
    <div className={styles.step}>
      <div className={styles.lineArea}>
        <div className={styles.number}>
          {String(number).padStart(2, "0")}
        </div>

        <span className={styles.line} />
      </div>

      <div className={styles.stepContent}>
        <div className={styles.stepIcon}>
          <Icon size={19} />
        </div>

        <div>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
        </div>
      </div>
    </div>
  );
}

function ProcessColumn({
  type,
  title,
  description,
  steps,
}) {
  return (
    <article
      className={`${styles.processCard} ${styles[type]}`}
    >
      <header className={styles.processHeader}>
        <div className={styles.processIcon}>
          {type === "nfc" ? (
            <Radio />
          ) : (
            <Code2 />
          )}
        </div>

        <div>
          <span>
            {type === "nfc"
              ? "LINC NFC"
              : "LINC WEB"}
          </span>

          <h3>{title}</h3>

          <p>{description}</p>
        </div>
      </header>

      <div className={styles.steps}>
        {steps.map((step, index) => (
          <ProcessStep
            key={step.title}
            step={step}
            number={index + 1}
          />
        ))}
      </div>
    </article>
  );
}

function Process() {
  return (
    <section
      id="processo"
      className={styles.section}
    >
      <Container>
        <header className={styles.heading}>
          <span>NOSSO PROCESSO</span>

          <h2>
            Do planejamento
            <strong> ao resultado.</strong>
          </h2>

          <p>
            Processos claros e eficientes para entregar
            soluções que geram impacto real no seu negócio.
          </p>
        </header>

        <div className={styles.grid}>
          <ProcessColumn
            type="nfc"
            title="Automação NFC"
            description="Da oportunidade à automação."
            steps={nfcSteps}
          />

          <ProcessColumn
            type="web"
            title="Landing Page"
            description="Da estratégia à conversão."
            steps={webSteps}
          />
        </div>
      </Container>
    </section>
  );
}

export default Process;