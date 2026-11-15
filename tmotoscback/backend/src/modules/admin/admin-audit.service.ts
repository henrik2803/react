import { Prisma } from "../../generated/prisma/client.js";
import { ProductAuditAction } from "../../generated/prisma/enums.js";

const OMITTED_FIELDS = new Set(["id", "createdAt", "updatedAt"]);

type AuditRecord = Record<string, unknown>;

type RegisterProductAuditInput = {
  productId: number;
  productName: string | null;
  actorEmail: string;
  action: ProductAuditAction;
  changedFields: string[];
  before?: AuditRecord | null;
  after?: AuditRecord | null;
};

function cleanValue(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value ?? null)) as unknown;
}

function normalizeSnapshot(value: AuditRecord): AuditRecord {
  const result: AuditRecord = {};

  for (const [field, rawValue] of Object.entries(value)) {
    if (OMITTED_FIELDS.has(field)) continue;

    // IDs de cores/variantes podem mudar quando a UI envia a lista inteira.
    // A auditoria deve comparar seus atributos reais, não IDs internos.
    if (field === "colors" && Array.isArray(rawValue)) {
      result[field] = rawValue
        .map((item: { key: string; name: string; hex: string }) => ({
          key: item.key,
          name: item.name,
          hex: item.hex,
        }))
        .sort((a, b) => a.key.localeCompare(b.key));
      continue;
    }

    if (field === "variants" && Array.isArray(rawValue)) {
      result[field] = rawValue
        .map((item: { key: string; colorKey: string | null; size: string | null; stock: number }) => ({
          key: item.key,
          colorKey: item.colorKey ?? null,
          size: item.size ?? null,
          stock: item.stock,
        }))
        .sort((a, b) => a.key.localeCompare(b.key));
      continue;
    }

    result[field] = cleanValue(rawValue);
  }

  return result;
}

/** Retorna somente os campos que realmente mudaram. */
export function buildProductAuditChanges(
  previous: AuditRecord | null,
  current: AuditRecord
) {
  const before = previous ? normalizeSnapshot(previous) : null;
  const after = normalizeSnapshot(current);

  const changedFields = Object.keys(after).filter(
    (field) => before === null ||
      JSON.stringify(before[field]) !== JSON.stringify(after[field])
  );

  const beforeChanged: AuditRecord = {};
  const afterChanged: AuditRecord = {};

  for (const field of changedFields) {
    if (before) beforeChanged[field] = before[field] ?? null;
    afterChanged[field] = after[field] ?? null;
  }

  return {
    changedFields,
    before: before ? beforeChanged : null,
    after: afterChanged,
  };
}

function toJson(value: AuditRecord | null | undefined) {
  if (value === null || value === undefined) return Prisma.DbNull;
  return cleanValue(value) as Prisma.InputJsonValue;
}

/** Deve ser chamado dentro da MESMA transação que modifica o produto. */
export async function registerProductAudit(
  tx: Prisma.TransactionClient,
  data: RegisterProductAuditInput
) {
  if (!data.actorEmail?.trim()) {
    throw new Error("Auditoria exige administrador autenticado.");
  }

  return tx.productAuditLog.create({
    data: {
      productId: data.productId,
      productName: data.productName,
      actorEmail: data.actorEmail.trim().toLowerCase(),
      action: data.action,
      changedFields: data.changedFields,
      before: toJson(data.before),
      after: toJson(data.after),
    },
  });
}
