import {
  BadgeCheck,
  Contact,
  CreditCard,
  Gift,
  LockKeyhole,
  PackageSearch,
  Radio,
  Share2,
  Smartphone,
  Utensils,
  Wifi,
  Zap,
} from "lucide-react";

import Container from "../../ui/Container/Container";

import styles from "./NFC.module.css";

const applications = [
  {
    icon: Utensils,
    title: "Cardápios Inteligentes",
  },
  {
    icon: LockKeyhole,
    title: "Controle de acesso",
  },
  {
    icon: BadgeCheck,
    title: "Identificação",
  },
  {
    icon: CreditCard,
    title: "Pagamentos",
  },
  {
    icon: Contact,
    title: "Cartão de visita digital",
  },
  {
    icon: PackageSearch,
    title: "Controle de estoque",
  },
  {
    icon: Share2,
    title: "Redes sociais",
  },
  {
    icon: Gift,
    title: "Fidelização",
  },
];

function NFC() {
  return (
    <section
      id="nfc"
      className={styles.section}
    >
      <Container className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <Radio size={15} />
            LINC NFC
          </span>

          <h2>
            Aproxime.
            <br />
            Conecte.
            <br />
            <span>Automatize.</span>
          </h2>

          <p className={styles.description}>
            Simplifique processos e ofereça uma
            experiência moderna aos seus clientes
            utilizando tecnologia NFC.
          </p>

          <div className={styles.applications}>
            {applications.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className={styles.application}
                  key={item.title}
                >
                  <div className={styles.applicationIcon}>
                    <Icon size={20} />
                  </div>

                  <span>{item.title}</span>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className={styles.visual}
          aria-hidden="true"
        >
          <div className={styles.glow} />

          <div className={styles.radar}>
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className={styles.phone}>
            <div className={styles.phoneTop} />

            <div className={styles.screen}>
              <div className={styles.screenIcon}>
                <Radio size={38} />
              </div>

              <strong>
                Dispositivo detectado
              </strong>

              <p>
                Tecnologia NFC conectando sua
                empresa.
              </p>

              <div className={styles.status}>
                <span />
                Conectado
              </div>
            </div>
          </div>

          <div className={styles.tag}>
            <div className={styles.tagInner}>
              <Wifi size={28} />

              <strong>NFC</strong>

              <span>LINC</span>
            </div>
          </div>

          <div className={styles.energy}>
            <Zap size={22} />
          </div>

          <div className={styles.smartphone}>
            <Smartphone size={21} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NFC;