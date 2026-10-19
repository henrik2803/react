import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Boxes,
  Palette,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  createAdminProduct,
  getAdminProduct,
  updateAdminProduct,
} from "../../services/adminService";

import styles from "./AdminProductForm.module.css";

const INITIAL_FORM = {
  type: "ACCESSORY",

  category: "",
  subcategory: "",

  brand: "",
  name: "",
  slug: "",

  active: true,

  condition: "novo",

  shortDescription: "",
  description: "",

  price: "",
  oldPrice: "",

  purchasableOnline: true,
  requestQuote: false,
  testRide: false,
  whatsapp: true,
};

function createSlug(value) {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

function createKey(value) {
  return createSlug(
    value
  );
}

function AdminProductForm() {
  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAdminAuth();

  const editing =
    Boolean(id);

  const [
    form,
    setForm,
  ] = useState(
    INITIAL_FORM
  );

  const [
    colors,
    setColors,
  ] = useState([]);

  const [
    variants,
    setVariants,
  ] = useState([]);

  const [
    relationsDirty,
    setRelationsDirty,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(
    editing
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    slugEdited,
    setSlugEdited,
  ] = useState(false);

  useEffect(() => {
    if (!editing) {
      return;
    }

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminProduct(
            id,
            token
          );

        const product =
          response.data;

        setForm({
          type:
            product.type,

          category:
            product.category ||
            "",

          subcategory:
            product.subcategory ||
            "",

          brand:
            product.brand ||
            "",

          name:
            product.name ||
            "",

          slug:
            product.slug ||
            "",

          active:
            Boolean(
              product.active
            ),

          condition:
            product.condition ||
            "",

          shortDescription:
            product.shortDescription ||
            "",

          description:
            product.description ||
            "",

          price:
            product.price ??
            "",

          oldPrice:
            product.oldPrice ??
            "",

          purchasableOnline:
            product.sales
              ?.purchasableOnline ??
            false,

          requestQuote:
            product.sales
              ?.requestQuote ??
            false,

          testRide:
            product.sales
              ?.testRide ??
            false,

          whatsapp:
            product.sales
              ?.whatsapp ??
            true,
        });

        setColors(
          (product.colors || []).map(
            (color) => ({
              key:
                color.key,

              name:
                color.name,

              hex:
                color.hex,
            })
          )
        );

        setVariants(
          (
            product.variants ||
            []
          ).map(
            (variant) => ({
              key:
                variant.key,

              colorKey:
                variant.colorKey ??
                "",

              size:
                variant.size ??
                "",

              stock:
                variant.stock ??
                0,
            })
          )
        );

        setRelationsDirty(
          false
        );

        setSlugEdited(
          true
        );
      } catch (error) {
        if (
          error.status === 401 ||
          error.status === 403
        ) {
          logout();
          return;
        }

        setError(
          error.message
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [
    editing,
    id,
    token,
  ]);

  const totalVariantStock =
    useMemo(
      () =>
        variants.reduce(
          (
            total,
            variant
          ) =>
            total +
            Number(
              variant.stock ||
              0
            ),
          0
        ),
      [variants]
    );

  function handleChange(
    event
  ) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    if (
      name === "name"
    ) {
      setForm(
        (current) => ({
          ...current,

          name:
            value,

          slug:
            slugEdited
              ? current.slug
              : createSlug(
                  value
                ),
        })
      );

      return;
    }

    if (
      name === "slug"
    ) {
      setSlugEdited(
        true
      );
    }

    setForm(
      (current) => ({
        ...current,

        [name]:
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  }

  function addColor() {
    setColors(
      (current) => [
        ...current,

        {
          key: "",
          name: "",
          hex: "#111111",
        },
      ]
    );

    setRelationsDirty(
      true
    );
  }

  function updateColor(
    index,
    field,
    value
  ) {
    setColors(
      (current) =>
        current.map(
          (
            color,
            colorIndex
          ) => {
            if (
              colorIndex !==
              index
            ) {
              return color;
            }

            const next = {
              ...color,
              [field]:
                value,
            };

            if (
              field === "name" &&
              !color.key
            ) {
              next.key =
                createKey(
                  value
                );
            }

            return next;
          }
        )
    );

    setRelationsDirty(
      true
    );
  }

  function removeColor(
    index
  ) {
    const removed =
      colors[index];

    setColors(
      (current) =>
        current.filter(
          (
            _,
            colorIndex
          ) =>
            colorIndex !==
            index
        )
    );

    if (
      removed?.key
    ) {
      setVariants(
        (current) =>
          current.map(
            (variant) =>
              variant.colorKey ===
              removed.key
                ? {
                    ...variant,
                    colorKey:
                      "",
                  }
                : variant
          )
      );
    }

    setRelationsDirty(
      true
    );
  }

  function addVariant() {
    setVariants(
      (current) => [
        ...current,

        {
          key: "",
          colorKey:
            colors[0]
              ?.key ||
            "",
          size: "",
          stock: 0,
        },
      ]
    );

    setRelationsDirty(
      true
    );
  }

  function updateVariant(
    index,
    field,
    value
  ) {
    setVariants(
      (current) =>
        current.map(
          (
            variant,
            variantIndex
          ) =>
            variantIndex ===
            index
              ? {
                  ...variant,

                  [field]:
                    field ===
                    "stock"
                      ? value
                      : value,
                }
              : variant
        )
    );

    setRelationsDirty(
      true
    );
  }

  function removeVariant(
    index
  ) {
    setVariants(
      (current) =>
        current.filter(
          (
            _,
            variantIndex
          ) =>
            variantIndex !==
            index
        )
    );

    setRelationsDirty(
      true
    );
  }

  function validateRelations() {
    const normalizedColors =
      colors.map(
        (color) => ({
          key:
            color.key.trim(),

          name:
            color.name.trim(),

          hex:
            color.hex.trim(),
        })
      );

    const colorKeys =
      normalizedColors.map(
        (color) =>
          color.key
      );

    if (
      normalizedColors.some(
        (color) =>
          !color.key ||
          !color.name ||
          !color.hex
      )
    ) {
      throw new Error(
        "Preencha todos os campos das cores."
      );
    }

    if (
      new Set(
        colorKeys
      ).size !==
      colorKeys.length
    ) {
      throw new Error(
        "Existem cores com identificadores duplicados."
      );
    }

    const normalizedVariants =
      variants.map(
        (variant) => ({
          key:
            variant.key.trim(),

          colorKey:
            variant.colorKey
              ? variant.colorKey
              : null,

          size:
            variant.size.trim()
              ? variant.size.trim()
              : null,

          stock:
            Number(
              variant.stock ||
              0
            ),
        })
      );

    const variantKeys =
      normalizedVariants.map(
        (variant) =>
          variant.key
      );

    if (
      normalizedVariants.some(
        (variant) =>
          !variant.key
      )
    ) {
      throw new Error(
        "Todas as variantes precisam de um identificador."
      );
    }

    if (
      new Set(
        variantKeys
      ).size !==
      variantKeys.length
    ) {
      throw new Error(
        "Existem variantes com identificadores duplicados."
      );
    }

    const validColorKeys =
      new Set(
        colorKeys
      );

    const invalidVariant =
      normalizedVariants.find(
        (variant) =>
          variant.colorKey &&
          !validColorKeys.has(
            variant.colorKey
          )
      );

    if (
      invalidVariant
    ) {
      throw new Error(
        `A variante "${invalidVariant.key}" possui uma cor inválida.`
      );
    }

    if (
      normalizedVariants.some(
        (variant) =>
          !Number.isInteger(
            variant.stock
          ) ||
          variant.stock <
            0
      )
    ) {
      throw new Error(
        "O estoque das variantes deve ser um número inteiro igual ou maior que zero."
      );
    }

    return {
      colors:
        normalizedColors,

      variants:
        normalizedVariants,
    };
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (
        !form.category.trim() ||
        !form.brand.trim() ||
        !form.name.trim() ||
        !form.slug.trim()
      ) {
        throw new Error(
          "Preencha os campos obrigatórios."
        );
      }

      const price =
        Number(
          form.price
        );

      if (
        Number.isNaN(
          price
        ) ||
        price < 0
      ) {
        throw new Error(
          "Informe um preço válido."
        );
      }

      const relations =
        validateRelations();

      const payload = {
        type:
          form.type,

        category:
          form.category.trim(),

        subcategory:
          form.subcategory
            .trim() ||
          null,

        brand:
          form.brand.trim(),

        name:
          form.name.trim(),

        slug:
          form.slug.trim(),

        active:
          form.active,

        condition:
          form.condition
            .trim() ||
          null,

        shortDescription:
          form.shortDescription
            .trim() ||
          null,

        description:
          form.description
            .trim() ||
          null,

        price,

        oldPrice:
          form.oldPrice ===
          ""
            ? null
            : Number(
                form.oldPrice
              ),

        sales: {
          purchasableOnline:
            form.purchasableOnline,

          requestQuote:
            form.requestQuote,

          testRide:
            form.testRide,

          whatsapp:
            form.whatsapp,
        },
      };

      if (
        !editing ||
        relationsDirty
      ) {
        payload.colors =
          relations.colors;

        payload.variants =
          relations.variants;
      }

      if (editing) {
        await updateAdminProduct(
          id,
          payload,
          token
        );
      } else {
        await createAdminProduct(
          payload,
          token
        );
      }

      navigate(
        "/admin/produtos"
      );
    } catch (error) {
      if (
        error.status === 401 ||
        error.status === 403
      ) {
        logout();
        return;
      }

      console.error(
        error.data ||
        error
      );

      setError(
        error.message
      );

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main
        className={
          styles.page
        }
      >
        <div
          className={
            styles.loading
          }
        >
          Carregando produto...
        </div>
      </main>
    );
  }

  return (
    <main
      className={
        styles.page
      }
    >
      <header
        className={
          styles.header
        }
      >
        <Link
          to="/admin/produtos"
          className={
            styles.back
          }
        >
          <ArrowLeft
            size={17}
          />

          Voltar para produtos
        </Link>

        <span
          className={
            styles.eyebrow
          }
        >
          Catálogo
        </span>

        <h1>
          {editing
            ? "Editar produto"
            : "Novo produto"}
        </h1>

        <p>
          {editing
            ? "Altere as informações do produto selecionado."
            : "Cadastre um novo produto no catálogo da TMotos."}
        </p>
      </header>

      {error && (
        <div
          className={
            styles.error
          }
        >
          {error}
        </div>
      )}

      <form
        className={
          styles.form
        }
        onSubmit={
          handleSubmit
        }
      >
        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Informações básicas
            </h2>

            <p>
              Identificação principal
              do produto.
            </p>
          </div>

          <div
            className={
              styles.grid
            }
          >
            <label>
              Tipo

              <select
                name="type"
                value={
                  form.type
                }
                onChange={
                  handleChange
                }
              >
                <option value="MOTO">
                  Moto
                </option>

                <option value="ACCESSORY">
                  Acessório
                </option>

                <option value="PART">
                  Peça
                </option>
              </select>
            </label>

            <label>
              Condição

              <input
                type="text"
                name="condition"
                value={
                  form.condition
                }
                onChange={
                  handleChange
                }
                placeholder="novo"
              />
            </label>

            <label>
              Categoria *

              <input
                type="text"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              Subcategoria

              <input
                type="text"
                name="subcategory"
                value={
                  form.subcategory
                }
                onChange={
                  handleChange
                }
              />
            </label>

            <label>
              Marca *

              <input
                type="text"
                name="brand"
                value={
                  form.brand
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label>
              Nome *

              <input
                type="text"
                name="name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                required
              />
            </label>

            <label
              className={
                styles.full
              }
            >
              Slug *

              <input
                type="text"
                name="slug"
                value={
                  form.slug
                }
                onChange={
                  handleChange
                }
                required
              />

              <small>
                Usado na URL pública
                do produto.
              </small>
            </label>
          </div>
        </section>

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Preços
            </h2>

            <p>
              Informe o preço atual
              e o preço anterior,
              quando houver.
            </p>
          </div>

          <div
            className={
              styles.grid
            }
          >
            <label>
              Preço atual *

              <input
                type="number"
                name="price"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
                step="0.01"
                min="0"
                required
              />
            </label>

            <label>
              Preço anterior

              <input
                type="number"
                name="oldPrice"
                value={
                  form.oldPrice
                }
                onChange={
                  handleChange
                }
                step="0.01"
                min="0"
              />
            </label>
          </div>
        </section>

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Descrições
            </h2>

            <p>
              Textos apresentados
              ao cliente.
            </p>
          </div>

          <div
            className={
              styles.stack
            }
          >
            <label>
              Descrição curta

              <textarea
                name="shortDescription"
                value={
                  form.shortDescription
                }
                onChange={
                  handleChange
                }
                rows="3"
              />
            </label>

            <label>
              Descrição completa

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                rows="7"
              />
            </label>
          </div>
        </section>

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.relationHeader
            }
          >
            <div>
              <div
                className={
                  styles.titleWithIcon
                }
              >
                <Palette
                  size={19}
                />

                <h2>
                  Cores
                </h2>
              </div>

              <p>
                Cadastre as cores
                disponíveis para o
                produto.
              </p>
            </div>

            <button
              type="button"
              className={
                styles.secondaryButton
              }
              onClick={
                addColor
              }
            >
              <Plus
                size={16}
              />

              Adicionar cor
            </button>
          </div>

          {colors.length ===
          0 ? (
            <div
              className={
                styles.relationEmpty
              }
            >
              Nenhuma cor
              cadastrada.
            </div>
          ) : (
            <div
              className={
                styles.colorList
              }
            >
              {colors.map(
                (
                  color,
                  index
                ) => (
                  <div
                    className={
                      styles.colorRow
                    }
                    key={
                      `color-${index}`
                    }
                  >
                    <label>
                      Nome

                      <input
                        value={
                          color.name
                        }
                        onChange={(
                          event
                        ) =>
                          updateColor(
                            index,
                            "name",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Preto"
                      />
                    </label>

                    <label>
                      Identificador

                      <input
                        value={
                          color.key
                        }
                        onChange={(
                          event
                        ) =>
                          updateColor(
                            index,
                            "key",
                            createKey(
                              event
                                .target
                                .value
                            )
                          )
                        }
                        placeholder="black"
                      />
                    </label>

                    <label>
                      Cor

                      <div
                        className={
                          styles.colorInput
                        }
                      >
                        <input
                          type="color"
                          value={
                            color.hex
                          }
                          onChange={(
                            event
                          ) =>
                            updateColor(
                              index,
                              "hex",
                              event
                                .target
                                .value
                            )
                          }
                        />

                        <input
                          type="text"
                          value={
                            color.hex
                          }
                          onChange={(
                            event
                          ) =>
                            updateColor(
                              index,
                              "hex",
                              event
                                .target
                                .value
                            )
                          }
                        />
                      </div>
                    </label>

                    <button
                      type="button"
                      className={
                        styles.removeButton
                      }
                      title="Remover cor"
                      onClick={() =>
                        removeColor(
                          index
                        )
                      }
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
        </section>

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.relationHeader
            }
          >
            <div>
              <div
                className={
                  styles.titleWithIcon
                }
              >
                <Boxes
                  size={19}
                />

                <h2>
                  Variantes
                </h2>
              </div>

              <p>
                Defina tamanho,
                cor e estoque de
                cada opção.
              </p>
            </div>

            <button
              type="button"
              className={
                styles.secondaryButton
              }
              onClick={
                addVariant
              }
            >
              <Plus
                size={16}
              />

              Adicionar variante
            </button>
          </div>

          <div
            className={
              styles.stockSummary
            }
          >
            <span>
              Estoque calculado
            </span>

            <strong>
              {totalVariantStock}
            </strong>
          </div>

          {variants.length ===
          0 ? (
            <div
              className={
                styles.relationEmpty
              }
            >
              Nenhuma variante
              cadastrada.
            </div>
          ) : (
            <div
              className={
                styles.variantList
              }
            >
              {variants.map(
                (
                  variant,
                  index
                ) => (
                  <div
                    className={
                      styles.variantRow
                    }
                    key={
                      `variant-${index}`
                    }
                  >
                    <label>
                      Identificador

                      <input
                        value={
                          variant.key
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            index,
                            "key",
                            createKey(
                              event
                                .target
                                .value
                            )
                          )
                        }
                        placeholder="capacete-black-58"
                      />
                    </label>

                    <label>
                      Cor

                      <select
                        value={
                          variant.colorKey
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            index,
                            "colorKey",
                            event
                              .target
                              .value
                          )
                        }
                      >
                        <option value="">
                          Sem cor
                        </option>

                        {colors.map(
                          (
                            color,
                            colorIndex
                          ) => (
                            <option
                              key={
                                `option-${colorIndex}-${color.key}`
                              }
                              value={
                                color.key
                              }
                            >
                              {color.name ||
                                color.key ||
                                `Cor ${colorIndex + 1}`}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <label>
                      Tamanho

                      <input
                        value={
                          variant.size
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            index,
                            "size",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="M / 58 / Único"
                      />
                    </label>

                    <label>
                      Estoque

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={
                          variant.stock
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            index,
                            "stock",
                            event
                              .target
                              .value
                          )
                        }
                      />
                    </label>

                    <button
                      type="button"
                      className={
                        styles.removeButton
                      }
                      title="Remover variante"
                      onClick={() =>
                        removeVariant(
                          index
                        )
                      }
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
              styles.relationNote
            }
          >
            Quando existem
            variantes, o estoque
            geral é calculado
            automaticamente pela
            soma dos estoques das
            variantes.
          </p>
        </section>

        <section
          className={
            styles.section
          }
        >
          <div
            className={
              styles.sectionHeader
            }
          >
            <h2>
              Comercial
            </h2>

            <p>
              Controle publicação
              e ações disponíveis
              para o cliente.
            </p>
          </div>

          <div
            className={
              styles.checkboxes
            }
          >
            <label>
              <input
                type="checkbox"
                name="active"
                checked={
                  form.active
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Produto ativo
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="purchasableOnline"
                checked={
                  form.purchasableOnline
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Compra online
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="requestQuote"
                checked={
                  form.requestQuote
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Solicitar proposta
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="testRide"
                checked={
                  form.testRide
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Test ride
              </span>
            </label>

            <label>
              <input
                type="checkbox"
                name="whatsapp"
                checked={
                  form.whatsapp
                }
                onChange={
                  handleChange
                }
              />

              <span>
                WhatsApp
              </span>
            </label>
          </div>
        </section>

        <footer
          className={
            styles.actions
          }
        >
          <Link
            to="/admin/produtos"
            className={
              styles.cancelButton
            }
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className={
              styles.saveButton
            }
            disabled={
              saving
            }
          >
            <Save
              size={18}
            />

            {saving
              ? "Salvando..."
              : editing
                ? "Salvar alterações"
                : "Criar produto"}
          </button>
        </footer>
      </form>
    </main>
  );
}

export default AdminProductForm;