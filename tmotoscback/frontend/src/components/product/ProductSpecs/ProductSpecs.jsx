import styles from "./ProductSpecs.module.css";

const labels = {
  engine: "Motor",
  performance: "Desempenho",
  transmission: "Transmissão",
  dimensions: "Dimensões",
  features: "Recursos",

  displacement: "Cilindrada",
  cylinders: "Cilindros",
  cooling: "Refrigeração",
  fuel: "Combustível",
  injection: "Alimentação",

  power: "Potência",
  torque: "Torque",

  gears: "Marchas",
  finalDrive: "Transmissão final",

  weight: "Peso",
  seatHeight: "Altura do assento",
  fuelTank: "Tanque",

  type: "Tipo",
  material: "Material",
  visor: "Viseira",
  ventilation: "Ventilação",
  removableLining: "Forro removível",
  pinlockReady: "Preparado para Pinlock",

  protections: "Proteções",
  waterproof: "Impermeável",

  knuckleProtection:
    "Proteção nos nós dos dedos",
  palmProtection:
    "Proteção na palma",
  touchscreen: "Touchscreen",
  cuff: "Cano",

  capacity: "Capacidade",
  removable: "Removível",
  helmetCapacity:
    "Capacidade de capacetes",
  lock: "Fechamento",
};

const unitFields = {
  displacement: "cc",
};

function getLabel(key) {
  return labels[key] ?? key;
}

function formatValue(key, value, parent) {
  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (
    key === "power" &&
    parent.powerUnit
  ) {
    return `${value} ${parent.powerUnit}`;
  }

  if (
    key === "torque" &&
    parent.torqueUnit
  ) {
    return `${value} ${parent.torqueUnit}`;
  }

  if (
    key === "weight" &&
    parent.weightUnit
  ) {
    return `${value} ${parent.weightUnit}`;
  }

  if (
    key === "seatHeight" &&
    parent.seatHeightUnit
  ) {
    return `${value} ${parent.seatHeightUnit}`;
  }

  if (
    key === "fuelTank" &&
    parent.fuelTankUnit
  ) {
    return `${value} ${parent.fuelTankUnit}`;
  }

  if (
    key === "capacity" &&
    parent.capacityUnit
  ) {
    return `${value} ${parent.capacityUnit}`;
  }

  if (unitFields[key]) {
    return `${value} ${unitFields[key]}`;
  }

  return String(value);
}

function shouldHideField(key) {
  return [
    "powerUnit",
    "torqueUnit",
    "weightUnit",
    "seatHeightUnit",
    "fuelTankUnit",
    "capacityUnit",
  ].includes(key);
}

function SpecRows({ specs }) {
  return Object.entries(specs)
    .filter(
      ([key]) =>
        !shouldHideField(key)
    )
    .map(([key, value]) => {
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        return null;
      }

      return (
        <div
          key={key}
          className={styles.row}
        >
          <span className={styles.key}>
            {getLabel(key)}
          </span>

          <strong
            className={styles.value}
          >
            {formatValue(
              key,
              value,
              specs
            )}
          </strong>
        </div>
      );
    });
}

function ProductSpecs({ specs }) {
  if (!specs) {
    return null;
  }

  const entries =
    Object.entries(specs);

  const groups = entries.filter(
    ([, value]) =>
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
  );

  const rootSpecs =
    Object.fromEntries(
      entries.filter(
        ([, value]) =>
          !(
            value &&
            typeof value === "object" &&
            !Array.isArray(value)
          )
      )
    );

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <span
          className={styles.eyebrow}
        >
          Detalhes
        </span>

        <h2>
          Especificações
        </h2>
      </div>

      {Object.keys(rootSpecs).length >
        0 && (
        <div className={styles.group}>
          <SpecRows
            specs={rootSpecs}
          />
        </div>
      )}

      {groups.map(
        ([groupName, groupSpecs]) => (
          <div
            key={groupName}
            className={styles.group}
          >
            <h3>
              {getLabel(groupName)}
            </h3>

            <SpecRows
              specs={groupSpecs}
            />
          </div>
        )
      )}
    </section>
  );
}

export default ProductSpecs;