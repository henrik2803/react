import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  BadgePercent,
  Boxes,
  Image,
  Megaphone,
  Package,
  Palette,
  Plus,
  Save,
  Search,
  Tags,
  Trash2,
  WalletCards,
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

  installmentEnabled: false,
  installmentCount: "",
  installmentValue: "",

  stockAvailable: true,
  stockQuantity: "",

  cover: "",
  video: "",
  images: "",

  feedEnabled: false,
  feedFeatured: false,
  feedOrder: "",
  feedText: "",

  badges: "",
  tags: "",

  seoTitle: "",
  seoDescription: "",

  purchasableOnline: true,
  requestQuote: false,
  testRide: false,
  whatsapp: true,
};

function createSlug(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createKey(value) {
  return createSlug(value);
}

function parseList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseImages(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function AdminProductForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAdminAuth();

  const editing = Boolean(id);

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [colors, setColors] =
    useState([]);

  const [variants, setVariants] =
    useState([]);

  const [
    relationsDirty,
    setRelationsDirty,
  ] = useState(false);

  const [loading, setLoading] =
    useState(editing);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

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
            product.category || "",

          subcategory:
            product.subcategory || "",

          brand:
            product.brand || "",

          name:
            product.name || "",

          slug:
            product.slug || "",

          active:
            Boolean(
              product.active
            ),

          condition:
            product.condition || "",

          shortDescription:
            product.shortDescription ||
            "",

          description:
            product.description || "",

          price:
            product.price ?? "",

          oldPrice:
            product.oldPrice ?? "",

          installmentEnabled:
            product.installment
              ?.enabled ?? false,

          installmentCount:
            product.installment
              ?.count ?? "",

          installmentValue:
            product.installment
              ?.value ?? "",

          stockAvailable:
            product.stock
              ?.available ?? true,

          stockQuantity:
            product.stock
              ?.quantity ?? "",

          cover:
            product.media
              ?.cover || "",

          video:
            product.media
              ?.video || "",

          images:
            (
              product.media
                ?.images || []
            ).join("\n"),

          feedEnabled:
            product.feed
              ?.enabled ?? false,

          feedFeatured:
            product.feed
              ?.featured ?? false,

          feedOrder:
            product.feed
              ?.order ?? "",

          feedText:
            product.feed
              ?.text || "",

          badges:
            (
              product.badges || []
            ).join(", "),

          tags:
            (
              product.tags || []
            ).join(", "),

          seoTitle:
            product.seo
              ?.title || "",

          seoDescription:
            product.seo
              ?.description || "",

          purchasableOnline:
            product.sales
              ?.purchasableOnline ??
            false,

          requestQuote:
            product.sales
              ?.requestQuote ?? false,

          testRide:
            product.sales
              ?.testRide ?? false,

          whatsapp:
            product.sales
              ?.whatsapp ?? true,
        });

        setColors(
          (
            product.colors || []
          ).map((color) => ({
            key:
              color.key,

            name:
              color.name,

            hex:
              color.hex,
          }))
        );

        setVariants(
          (
            product.variants || []
          ).map((variant) => ({
            key:
              variant.key,

            colorKey:
              variant.colorKey ?? "",

            size:
              variant.size ?? "",

            stock:
              variant.stock ?? 0,
          }))
        );

        setRelationsDirty(false);
        setSlugEdited(true);
      } catch (error) {
        if (
          error.status === 401 ||
          error.status === 403
        ) {
          logout();
          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [
    editing,
    id,
    token,
    logout,
  ]);

  const totalVariantStock =
    useMemo(
      () =>
        variants.reduce(
          (total, variant) =>
            total +
            Number(
              variant.stock || 0
            ),
          0
        ),
      [variants]
    );

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    if (name === "name") {
      setForm(
        (current) => ({
          ...current,

          name: value,

          slug:
            slugEdited
              ? current.slug
              : createSlug(value),
        })
      );

      return;
    }

    if (name === "slug") {
      setSlugEdited(true);
    }

    setForm(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
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

    setRelationsDirty(true);
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
              colorIndex !== index
            ) {
              return color;
            }

            const next = {
              ...color,
              [field]: value,
            };

            if (
              field === "name" &&
              !color.key
            ) {
              next.key =
                createKey(value);
            }

            return next;
          }
        )
    );

    setRelationsDirty(true);
  }

  function removeColor(index) {
    const removed =
      colors[index];

    setColors(
      (current) =>
        current.filter(
          (_, colorIndex) =>
            colorIndex !== index
        )
    );

    if (removed?.key) {
      setVariants(
        (current) =>
          current.map(
            (variant) =>
              variant.colorKey ===
              removed.key
                ? {
                    ...variant,
                    colorKey: "",
                  }
                : variant
          )
      );
    }

    setRelationsDirty(true);
  }

  function addVariant() {
    setVariants(
      (current) => [
        ...current,
        {
          key: "",
          colorKey:
            colors[0]?.key || "",
          size: "",
          stock: 0,
        },
      ]
    );

    setRelationsDirty(true);
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
            variantIndex === index
              ? {
                  ...variant,
                  [field]: value,
                }
              : variant
        )
    );

    setRelationsDirty(true);
  }

  function removeVariant(index) {
    setVariants(
      (current) =>
        current.filter(
          (_, variantIndex) =>
            variantIndex !== index
        )
    );

    setRelationsDirty(true);
  }

  function validateRelations() {
    const normalizedColors =
      colors.map((color) => ({
        key:
          color.key.trim(),

        name:
          color.name.trim(),

        hex:
          color.hex.trim(),
      }));

    const colorKeys =
      normalizedColors.map(
        (color) => color.key
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
      new Set(colorKeys).size !==
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
            variant.colorKey ||
            null,

          size:
            variant.size.trim() ||
            null,

          stock:
            Number(
              variant.stock || 0
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
      new Set(colorKeys);

    const invalidVariant =
      normalizedVariants.find(
        (variant) =>
          variant.colorKey &&
          !validColorKeys.has(
            variant.colorKey
          )
      );

    if (invalidVariant) {
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
          variant.stock < 0
      )
    ) {
      throw new Error(
        "O estoque das variantes deve ser inteiro e igual ou maior que zero."
      );
    }

    return {
      colors:
        normalizedColors,

      variants:
        normalizedVariants,
    };
  }

  function validateForm() {
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
      Number(form.price);

    if (
      Number.isNaN(price) ||
      price < 0
    ) {
      throw new Error(
        "Informe um preço válido."
      );
    }

    if (
      form.oldPrice !== "" &&
      (
        Number.isNaN(
          Number(
            form.oldPrice
          )
        ) ||
        Number(
          form.oldPrice
        ) < 0
      )
    ) {
      throw new Error(
        "Informe um preço anterior válido."
      );
    }

    if (
      form.installmentEnabled
    ) {
      const count =
        Number(
          form.installmentCount
        );

      const value =
        Number(
          form.installmentValue
        );

      if (
        !Number.isInteger(count) ||
        count <= 0
      ) {
        throw new Error(
          "Informe uma quantidade válida de parcelas."
        );
      }

      if (
        Number.isNaN(value) ||
        value < 0
      ) {
        throw new Error(
          "Informe um valor válido para a parcela."
        );
      }
    }

    if (
      variants.length === 0 &&
      form.stockQuantity !== ""
    ) {
      const quantity =
        Number(
          form.stockQuantity
        );

      if (
        !Number.isInteger(
          quantity
        ) ||
        quantity < 0
      ) {
        throw new Error(
          "O estoque manual deve ser inteiro e igual ou maior que zero."
        );
      }
    }

    if (
      form.feedOrder !== ""
    ) {
      const order =
        Number(
          form.feedOrder
        );

      if (
        !Number.isInteger(order) ||
        order < 0
      ) {
        throw new Error(
          "A ordem do feed deve ser um número inteiro igual ou maior que zero."
        );
      }
    }

    return price;
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const price =
        validateForm();

      const relations =
        validateRelations();

      const payload = {
        type:
          form.type,

        category:
          form.category.trim(),

        subcategory:
          form.subcategory.trim() ||
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
          form.condition.trim() ||
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
          form.oldPrice === ""
            ? null
            : Number(
                form.oldPrice
              ),

        installment: {
          enabled:
            form.installmentEnabled,

          count:
            form.installmentEnabled &&
            form.installmentCount !==
              ""
              ? Number(
                  form.installmentCount
                )
              : null,

          value:
            form.installmentEnabled &&
            form.installmentValue !==
              ""
              ? Number(
                  form.installmentValue
                )
              : null,
        },

        media: {
          cover:
            form.cover.trim() ||
            null,

          images:
            parseImages(
              form.images
            ),

          video:
            form.video.trim() ||
            null,
        },

        badges:
          parseList(
            form.badges
          ),

        tags:
          parseList(
            form.tags
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

        feed: {
          enabled:
            form.feedEnabled,

          featured:
            form.feedFeatured,

          order:
            form.feedOrder === ""
              ? null
              : Number(
                  form.feedOrder
                ),

          text:
            form.feedText.trim() ||
            null,
        },

        seo: {
          title:
            form.seoTitle.trim() ||
            null,

          description:
            form.seoDescription
              .trim() ||
            null,
        },
      };

      /*
       * Sem variantes, o estoque
       * é informado manualmente.
       */
      if (
        relations.variants
          .length === 0
      ) {
        payload.stock = {
          available:
            form.stockAvailable,

          quantity:
            form.stockQuantity ===
            ""
              ? null
              : Number(
                  form.stockQuantity
                ),
        };
      }

      /*
       * No cadastro novo sempre
       * enviamos as relações.
       *
       * Na edição só enviamos
       * quando foram alteradas.
       */
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
        error.data || error
      );

      setError(
        error.message
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
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
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Informações básicas</h2>
            <p>Identificação principal do produto.</p>
          </div>

          <div className={styles.grid}>
            <label>
              Tipo
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="MOTO">Moto</option>
                <option value="ACCESSORY">Acessório</option>
                <option value="PART">Peça</option>
              </select>
            </label>

            <label>
              Condição
              <input
                name="condition"
                value={form.condition}
                onChange={handleChange}
                placeholder="novo"
              />
            </label>

            <label>
              Categoria *
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Subcategoria
              <input
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
              />
            </label>

            <label>
              Marca *
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Nome *
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className={styles.full}>
              Slug *
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
              />

              <small>
                Usado na URL pública do produto.
              </small>
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <BadgePercent size={19} />
              <h2>Preços e parcelamento</h2>
            </div>
          </div>

          <div className={styles.grid}>
            <label>
              Preço atual *
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </label>

            <label>
              Preço anterior
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </label>
          </div>

          <div className={styles.optionBox}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                name="installmentEnabled"
                checked={
                  form.installmentEnabled
                }
                onChange={handleChange}
              />

              <WalletCards size={18} />

              Permitir parcelamento
            </label>

            {form.installmentEnabled && (
              <div className={styles.grid}>
                <label>
                  Número de parcelas
                  <input
                    type="number"
                    name="installmentCount"
                    value={
                      form.installmentCount
                    }
                    onChange={handleChange}
                    min="1"
                    step="1"
                  />
                </label>

                <label>
                  Valor da parcela
                  <input
                    type="number"
                    name="installmentValue"
                    value={
                      form.installmentValue
                    }
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </label>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Descrições</h2>
          </div>

          <div className={styles.stack}>
            <label>
              Descrição curta
              <textarea
                name="shortDescription"
                value={
                  form.shortDescription
                }
                onChange={handleChange}
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
                onChange={handleChange}
                rows="7"
              />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <Image size={19} />
              <h2>Mídia</h2>
            </div>

            <p>
              Por enquanto trabalharemos com URLs. Upload de arquivos pode ser adicionado depois.
            </p>
          </div>

          <div className={styles.stack}>
            <label>
              Imagem de capa
              <input
                name="cover"
                value={form.cover}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>

            <label>
              Galeria
              <textarea
                name="images"
                value={form.images}
                onChange={handleChange}
                rows="5"
                placeholder={
                  "Uma URL por linha\nhttps://...\nhttps://..."
                }
              />
            </label>

            <label>
              Vídeo
              <input
                name="video"
                value={form.video}
                onChange={handleChange}
                placeholder="/videos/produto.mp4 ou https://..."
              />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.relationHeader}>
            <div>
              <div className={styles.titleWithIcon}>
                <Palette size={19} />
                <h2>Cores</h2>
              </div>

              <p>
                Cadastre as cores disponíveis para o produto.
              </p>
            </div>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={addColor}
            >
              <Plus size={16} />
              Adicionar cor
            </button>
          </div>

          {colors.length === 0 ? (
            <div className={styles.relationEmpty}>
              Nenhuma cor cadastrada.
            </div>
          ) : (
            <div className={styles.colorList}>
              {colors.map((color, index) => (
                <div
                  className={styles.colorRow}
                  key={`color-${index}`}
                >
                  <label>
                    Nome
                    <input
                      value={color.name}
                      onChange={(event) =>
                        updateColor(
                          index,
                          "name",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Identificador
                    <input
                      value={color.key}
                      onChange={(event) =>
                        updateColor(
                          index,
                          "key",
                          createKey(
                            event.target.value
                          )
                        )
                      }
                    />
                  </label>

                  <label>
                    Cor
                    <div className={styles.colorInput}>
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(event) =>
                          updateColor(
                            index,
                            "hex",
                            event.target.value
                          )
                        }
                      />

                      <input
                        value={color.hex}
                        onChange={(event) =>
                          updateColor(
                            index,
                            "hex",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </label>

                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() =>
                      removeColor(index)
                    }
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.relationHeader}>
            <div>
              <div className={styles.titleWithIcon}>
                <Boxes size={19} />
                <h2>Variantes e estoque</h2>
              </div>

              <p>
                O estoque das variantes substitui o estoque manual.
              </p>
            </div>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={addVariant}
            >
              <Plus size={16} />
              Adicionar variante
            </button>
          </div>

          {variants.length > 0 ? (
            <>
              <div className={styles.stockSummary}>
                <span>Estoque calculado</span>
                <strong>
                  {totalVariantStock}
                </strong>
              </div>

              <div className={styles.variantList}>
                {variants.map(
                  (variant, index) => (
                    <div
                      className={styles.variantRow}
                      key={`variant-${index}`}
                    >
                      <label>
                        Identificador
                        <input
                          value={variant.key}
                          onChange={(event) =>
                            updateVariant(
                              index,
                              "key",
                              createKey(
                                event.target.value
                              )
                            )
                          }
                        />
                      </label>

                      <label>
                        Cor
                        <select
                          value={
                            variant.colorKey
                          }
                          onChange={(event) =>
                            updateVariant(
                              index,
                              "colorKey",
                              event.target.value
                            )
                          }
                        >
                          <option value="">
                            Sem cor
                          </option>

                          {colors.map(
                            (color, colorIndex) => (
                              <option
                                key={`${colorIndex}-${color.key}`}
                                value={color.key}
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
                          value={variant.size}
                          onChange={(event) =>
                            updateVariant(
                              index,
                              "size",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Estoque
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={variant.stock}
                          onChange={(event) =>
                            updateVariant(
                              index,
                              "stock",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() =>
                          removeVariant(index)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className={styles.manualStock}>
              <div className={styles.titleWithIcon}>
                <Package size={18} />
                <strong>Estoque manual</strong>
              </div>

              <div className={styles.grid}>
                <label>
                  Quantidade
                  <input
                    type="number"
                    name="stockQuantity"
                    value={
                      form.stockQuantity
                    }
                    onChange={handleChange}
                    min="0"
                    step="1"
                  />
                </label>

                <label className={styles.toggleCard}>
                  <input
                    type="checkbox"
                    name="stockAvailable"
                    checked={
                      form.stockAvailable
                    }
                    onChange={handleChange}
                  />
                  Produto disponível
                </label>
              </div>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <Megaphone size={19} />
              <h2>Feed</h2>
            </div>
          </div>

          <div className={styles.checkboxes}>
            <label>
              <input
                type="checkbox"
                name="feedEnabled"
                checked={form.feedEnabled}
                onChange={handleChange}
              />
              Exibir no feed
            </label>

            <label>
              <input
                type="checkbox"
                name="feedFeatured"
                checked={form.feedFeatured}
                onChange={handleChange}
              />
              Produto em destaque
            </label>
          </div>

          <div className={styles.gridTop}>
            <label>
              Ordem
              <input
                type="number"
                name="feedOrder"
                value={form.feedOrder}
                onChange={handleChange}
                min="0"
                step="1"
              />
            </label>

            <label>
              Texto do feed
              <input
                name="feedText"
                value={form.feedText}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <Tags size={19} />
              <h2>Badges e tags</h2>
            </div>

            <p>
              Separe os itens por vírgula.
            </p>
          </div>

          <div className={styles.grid}>
            <label>
              Badges
              <input
                name="badges"
                value={form.badges}
                onChange={handleChange}
                placeholder="Destaque, Promoção"
              />
            </label>

            <label>
              Tags
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="moto, yamaha, naked"
              />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <Search size={19} />
              <h2>SEO</h2>
            </div>
          </div>

          <div className={styles.stack}>
            <label>
              Título SEO
              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
              />
            </label>

            <label>
              Descrição SEO
              <textarea
                name="seoDescription"
                value={
                  form.seoDescription
                }
                onChange={handleChange}
                rows="3"
              />
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Comercial</h2>
          </div>

          <div className={styles.checkboxes}>
            <label>
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Produto ativo
            </label>

            <label>
              <input
                type="checkbox"
                name="purchasableOnline"
                checked={
                  form.purchasableOnline
                }
                onChange={handleChange}
              />
              Compra online
            </label>

            <label>
              <input
                type="checkbox"
                name="requestQuote"
                checked={
                  form.requestQuote
                }
                onChange={handleChange}
              />
              Solicitar proposta
            </label>

            <label>
              <input
                type="checkbox"
                name="testRide"
                checked={form.testRide}
                onChange={handleChange}
              />
              Test ride
            </label>

            <label>
              <input
                type="checkbox"
                name="whatsapp"
                checked={form.whatsapp}
                onChange={handleChange}
              />
              WhatsApp
            </label>
          </div>
        </section>

        <footer className={styles.actions}>
          <Link
            to="/admin/produtos"
            className={styles.cancelButton}
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={saving}
          >
            <Save size={18} />

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