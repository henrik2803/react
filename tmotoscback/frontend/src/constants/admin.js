export const LEAD_STATUS_OPTIONS = [
  {
    value: "NEW",
    label: "Novo",
  },
  {
    value: "CONTACTED",
    label: "Contatado",
  },
  {
    value: "CLOSED",
    label: "Fechado",
  },
  {
    value: "CANCELLED",
    label: "Cancelado",
  },
];

export const TEST_RIDE_PERIOD_LABELS = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
};

export function formatAdminDate(
  value
) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString(
    "pt-BR"
  );
}