import {
  ArrowRight,
  Check,
  Radio,
  MonitorSmartphone,
  Smartphone,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import styles from "./Solutions.module.css";

const solutions = [
  {
    id: "nfc",
    eyebrow: "LINC NFC",
    icon: Radio,
    title: "Automação NFC",
    description:
      "Modernize seu negócio com tecnologia por aproximação.",
    features: [
      "Mais praticidade",
      "Mais segurança",
      "Mais resultados",
    ],
    href: "#nfc",
    variant: "nfc",
  },
  {
    id: "web",
    eyebrow: "LINC WEB",
    icon: MonitorSmartphone,
    title: "Landing Pages",
    description:
      "Converta visitantes em clientes com páginas profissionais, rápidas e otimizadas para resultados.",
    features: [
      "Alta performance",
      "Design responsivo",
      "Foco em conversão",
    ],
    href: "#landing-pages",
    variant: "web",
  },
];

function NFCVisual() {
  return (
    <div className={styles.nfcVisual} aria-hidden="true">
      <div className={styles.nfcGlow} />

      <div className={styles.nfcWaves}>
        <span />
        <span />
        <span />
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneSpeaker} />

        <div className={styles.phoneScreen}>
          <Radio size={34} />

          <strong>NFC</strong>

          <span>Aproxime para conectar</span>
        </div>
      </div>

      <div className={styles.nfcTag}>
        <Radio size={27} />
        <span>LINC</span>
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <div className={styles.webVisual} aria-hidden="true">
      <div className={styles.webGlow} />

      <div className={styles.browser}>
        <div className={styles.browserTop}>
          <span />
          <span />
          <span />

          <div className={styles.browserAddress} />
        </div>

        <div className={styles.browserContent}>
          <div className={styles.previewBadge}>
            Tecnologia
          </div>

          <div className={styles.previewTitle} />

          <div
            className={`${styles.previewTitle} ${styles.previewTitleSmall}`}
          />

          <div className={styles.previewText} />
          <div className={styles.previewTextShort} />

          <div className={styles.previewButton} />

          <div className={styles.previewCards}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className={styles.miniPhone}>
        <Smartphone size={24} />

        <div className={styles.miniPhoneContent}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function SolutionCard({ solution }) {
  const Icon = solution.icon;

  return (
    <article
      className={`${styles.card} ${styles[solution.variant]}`}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.icon}>
            <Icon size={24} />
          </div>

          <span>{solution.eyebrow}</span>
        </div>

        <h3>{solution.title}</h3>

        <p>{solution.description}</p>

        <ul>
          {solution.features.map((feature) => (
            <li key={feature}>
              <span className={styles.check}>
                <Check size={14} />
              </span>

              {feature}
            </li>
          ))}
        </ul>

        <a
          href={solution.href}
          className={styles.cardLink}
        >
          Saiba mais
          <ArrowRight size={17} />
        </a>
      </div>

      <div className={styles.cardVisual}>
        {solution.variant === "nfc" ? (
          <NFCVisual />
        ) : (
          <WebVisual />
        )}
      </div>
    </article>
  );
}

function Solutions() {
  return (
    <section
      id="solucoes"
      className={styles.solutions}
    >
      <Container>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>
            Nossas soluções
          </span>

          <h2>
            Tecnologia criada para
            <span> gerar resultados.</span>
          </h2>

          <p>
            Soluções inteligentes para empresas que
            querem crescer com mais eficiência e
            presença digital.
          </p>
        </div>

        <div className={styles.grid}>
          {solutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
            />
          ))}
        </div>

        <div className={styles.trust}>
          <div>
            <Zap size={20} />
            <span>Performance</span>
          </div>

          <div>
            <ShieldCheck size={20} />
            <span>Segurança</span>
          </div>

          <div>
            <TrendingUp size={20} />
            <span>Resultados</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Solutions;