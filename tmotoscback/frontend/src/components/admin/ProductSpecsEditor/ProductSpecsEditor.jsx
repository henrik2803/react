import {
  Plus,
  Trash2,
} from "lucide-react";

import styles from "./ProductSpecsEditor.module.css";

function ProductSpecsEditor({
  specs,
  onAdd,
  onChange,
  onRemove,
}) {
  return (
    <div>
      <div
        className={
          styles.header
        }
      >
        <div>
          <h3>
            Especificações
            técnicas
          </h3>

          <p>
            Adicione características
            específicas do produto.
          </p>
        </div>

        <button
          type="button"
          className={
            styles.addButton
          }
          onClick={
            onAdd
          }
        >
          <Plus
            size={16}
          />

          Adicionar
        </button>
      </div>

      {specs.length ===
      0 ? (
        <div
          className={
            styles.empty
          }
        >
          Nenhuma especificação
          cadastrada.
        </div>
      ) : (
        <div
          className={
            styles.list
          }
        >
          {specs.map(
            (
              spec,
              index
            ) => (
              <div
                key={
                  `spec-${index}`
                }
                className={
                  styles.row
                }
              >
                <label>
                  Campo

                  <input
                    value={
                      spec.key
                    }
                    onChange={(
                      event
                    ) =>
                      onChange(
                        index,
                        "key",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Ex.: displacement"
                  />
                </label>

                <label>
                  Valor

                  <textarea
                    value={
                      spec.value
                    }
                    onChange={(
                      event
                    ) =>
                      onChange(
                        index,
                        "value",
                        event
                          .target
                          .value
                      )
                    }
                    placeholder="Ex.: 689 ou Gasolina"
                    rows="2"
                  />
                </label>

                <button
                  type="button"
                  className={
                    styles.removeButton
                  }
                  onClick={() =>
                    onRemove(
                      index
                    )
                  }
                  title="Remover especificação"
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            )
          )}
        </div>
      )}

      <p
        className={
          styles.help
        }
      >
        Valores numéricos,
        booleanos, arrays e objetos
        JSON são reconhecidos
        automaticamente. Exemplo:
        {" "}
        <code>
          ["ABS","LED"]
        </code>
      </p>
    </div>
  );
}

export default ProductSpecsEditor;