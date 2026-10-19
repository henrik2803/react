import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Package,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getAdminProducts,
  updateAdminProductStatus,
} from "../../services/adminService";

import styles from "./AdminProducts.module.css";

const PRODUCT_TYPE_LABELS = {
  MOTO: "Moto",
  ACCESSORY: "Acessório",
  PART: "Peça",
};

function formatCurrency(
  value
) {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(
    Number(
      value || 0
    )
  );
}

function AdminProducts() {
  const {
    token,
    logout,
  } = useAdminAuth();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    typeFilter,
    setTypeFilter,
  ] = useState("ALL");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("ALL");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminProducts(
            token
          );

        setProducts(
          response.data || []
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

    loadProducts();
  }, [token]);

  const filteredProducts =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          const matchesSearch =
            !normalizedSearch ||
            [
              product.name,
              product.brand,
              product.category,
              product.subcategory,
              product.slug,
            ]
              .filter(Boolean)
              .some(
                (value) =>
                  String(value)
                    .toLowerCase()
                    .includes(
                      normalizedSearch
                    )
              );

          const matchesType =
            typeFilter ===
              "ALL" ||
            product.type ===
              typeFilter;

          const matchesStatus =
            statusFilter ===
              "ALL" ||
            (
              statusFilter ===
                "ACTIVE" &&
              product.active
            ) ||
            (
              statusFilter ===
                "INACTIVE" &&
              !product.active
            );

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        }
      );
    }, [
      products,
      search,
      typeFilter,
      statusFilter,
    ]);

  async function handleToggleStatus(
    product
  ) {
    try {
      setUpdatingId(
        product.id
      );

      setError("");

      const response =
        await updateAdminProductStatus(
          product.id,
          !product.active,
          token
        );

      setProducts(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              product.id
                ? response.data
                : item
          )
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
      setUpdatingId(null);
    }
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
        <div>
          <span
            className={
              styles.eyebrow
            }
          >
            Catálogo
          </span>

          <h1>
            Produtos
          </h1>

          <p>
            Gerencie motos,
            acessórios e peças
            disponíveis na
            plataforma.
          </p>
        </div>

        <div
          className={
            styles.headerActions
          }
        >
          <div
            className={
              styles.counter
            }
          >
            <Package
              size={18}
            />

            <strong>
              {products.length}
            </strong>
          </div>

          <Link
            to="/admin/produtos/novo"
            className={
              styles.newButton
            }
          >
            <Plus
              size={18}
            />

            Novo produto
          </Link>
        </div>
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

      <section
        className={
          styles.filters
        }
      >
        <div
          className={
            styles.search
          }
        >
          <Search
            size={18}
          />

          <input
            type="search"
            placeholder="Buscar produto, marca, categoria..."
            value={search}
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
          />
        </div>

        <select
          value={
            typeFilter
          }
          onChange={(
            event
          ) =>
            setTypeFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            Todos os tipos
          </option>

          <option value="MOTO">
            Motos
          </option>

          <option value="ACCESSORY">
            Acessórios
          </option>

          <option value="PART">
            Peças
          </option>
        </select>

        <select
          value={
            statusFilter
          }
          onChange={(
            event
          ) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            Todos os status
          </option>

          <option value="ACTIVE">
            Ativos
          </option>

          <option value="INACTIVE">
            Inativos
          </option>
        </select>
      </section>

      {loading ? (
        <div
          className={
            styles.loading
          }
        >
          Carregando produtos...
        </div>
      ) : (
        <div
          className={
            styles.tableWrapper
          }
        >
          <table
            className={
              styles.table
            }
          >
            <thead>
              <tr>
                <th>
                  Produto
                </th>

                <th>
                  Tipo
                </th>

                <th>
                  Categoria
                </th>

                <th>
                  Preço
                </th>

                <th>
                  Estoque
                </th>

                <th>
                  Status
                </th>

                <th>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map(
                (product) => {
                  const cover =
                    product.media
                      ?.cover ||
                    product.media
                      ?.images?.[0];

                  return (
                    <tr
                      key={
                        product.id
                      }
                    >
                      <td>
                        <div
                          className={
                            styles.product
                          }
                        >
                          <div
                            className={
                              styles.imageWrapper
                            }
                          >
                            {cover ? (
                              <img
                                src={
                                  cover
                                }
                                alt={
                                  product.name
                                }
                              />
                            ) : (
                              <Package
                                size={22}
                              />
                            )}
                          </div>

                          <div
                            className={
                              styles.productInfo
                            }
                          >
                            <strong>
                              {
                                product.name
                              }
                            </strong>

                            <span>
                              {
                                product.brand
                              }
                            </span>

                            <small>
                              {
                                product.slug
                              }
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={
                            styles.type
                          }
                        >
                          {PRODUCT_TYPE_LABELS[
                            product.type
                          ] ||
                            product.type}
                        </span>
                      </td>

                      <td>
                        <strong
                          className={
                            styles.category
                          }
                        >
                          {
                            product.category
                          }
                        </strong>

                        {product.subcategory && (
                          <small
                            className={
                              styles.subcategory
                            }
                          >
                            {
                              product.subcategory
                            }
                          </small>
                        )}
                      </td>

                      <td>
                        <strong
                          className={
                            styles.price
                          }
                        >
                          {formatCurrency(
                            product.price
                          )}
                        </strong>

                        {product.oldPrice !==
                          null &&
                          product.oldPrice !==
                            undefined && (
                            <small
                              className={
                                styles.oldPrice
                              }
                            >
                              {formatCurrency(
                                product.oldPrice
                              )}
                            </small>
                          )}
                      </td>

                      <td>
                        <span>
                          {product.stock
                            ?.quantity !==
                          null
                            ? (
                                product
                                  .stock
                                  ?.quantity ??
                                0
                              )
                            : "—"}
                        </span>

                        {!product.stock
                          ?.available && (
                          <small
                            className={
                              styles.stockWarning
                            }
                          >
                            Indisponível
                          </small>
                        )}
                      </td>

                      <td>
                        <span
                          className={
                            product.active
                              ? styles.active
                              : styles.inactive
                          }
                        >
                          {product.active
                            ? "Ativo"
                            : "Inativo"}
                        </span>
                      </td>

                      <td>
                        <div
                          className={
                            styles.rowActions
                          }
                        >
                          <Link
                            to={`/admin/produtos/${product.id}/editar`}
                            className={
                              styles.editButton
                            }
                          >
                            <Pencil
                              size={15}
                            />

                            Editar
                          </Link>

                          <button
                            type="button"
                            className={
                              product.active
                                ? styles.deactivateButton
                                : styles.activateButton
                            }
                            disabled={
                              updatingId ===
                              product.id
                            }
                            onClick={() =>
                              handleToggleStatus(
                                product
                              )
                            }
                          >
                            {updatingId ===
                            product.id
                              ? "Salvando..."
                              : product.active
                                ? "Desativar"
                                : "Ativar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}

              {filteredProducts.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
                    className={
                      styles.empty
                    }
                  >
                    Nenhum produto
                    encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default AdminProducts;