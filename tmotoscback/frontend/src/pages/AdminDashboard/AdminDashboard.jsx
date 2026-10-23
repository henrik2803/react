import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Bike,
  Boxes,
  CheckCircle2,
  ClipboardList,
  FileText,
  Package,
  TriangleAlert,
  UserRoundCheck,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getAdminProducts,
  getQuoteLeads,
  getTestRideLeads,
} from "../../services/adminService";

import {
  formatAdminDate,
} from "../../constants/admin";

import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const {
    token,
    logout,
  } = useAdminAuth();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    quoteLeads,
    setQuoteLeads,
  ] = useState([]);

  const [
    testRideLeads,
    setTestRideLeads,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /*
   * =====================================================
   * CARREGAMENTO
   * =====================================================
   */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          productsResponse,
          quotesResponse,
          testRidesResponse,
        ] = await Promise.all([
          getAdminProducts(
            token
          ),

          getQuoteLeads(
            token
          ),

          getTestRideLeads(
            token
          ),
        ]);

        setProducts(
          productsResponse.data ||
            []
        );

        setQuoteLeads(
          quotesResponse.data ||
            []
        );

        setTestRideLeads(
          testRidesResponse.data ||
            []
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
          error.message ||
            "Não foi possível carregar o painel."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [
    token,
    logout,
  ]);

  /*
   * =====================================================
   * RESUMO
   * =====================================================
   */

  const summary =
    useMemo(() => {
      const allLeads = [
        ...quoteLeads,
        ...testRideLeads,
      ];

      return {
        productsTotal:
          products.length,

        productsActive:
          products.filter(
            (product) =>
              product.active
          ).length,

        productsInactive:
          products.filter(
            (product) =>
              !product.active
          ).length,

        quotesTotal:
          quoteLeads.length,

        quotesNew:
          quoteLeads.filter(
            (lead) =>
              lead.status ===
              "NEW"
          ).length,

        quotesContacted:
          quoteLeads.filter(
            (lead) =>
              lead.status ===
              "CONTACTED"
          ).length,

        quotesClosed:
          quoteLeads.filter(
            (lead) =>
              lead.status ===
              "CLOSED"
          ).length,

        testRidesTotal:
          testRideLeads.length,

        testRidesNew:
          testRideLeads.filter(
            (lead) =>
              lead.status ===
              "NEW"
          ).length,

        testRidesContacted:
          testRideLeads.filter(
            (lead) =>
              lead.status ===
              "CONTACTED"
          ).length,

        testRidesClosed:
          testRideLeads.filter(
            (lead) =>
              lead.status ===
              "CLOSED"
          ).length,

        leadsTotal:
          allLeads.length,

        leadsNew:
          allLeads.filter(
            (lead) =>
              lead.status ===
              "NEW"
          ).length,
      };
    }, [
      products,
      quoteLeads,
      testRideLeads,
    ]);

  /*
   * =====================================================
   * ÚLTIMOS LEADS
   * =====================================================
   */

  const recentLeads =
    useMemo(() => {
      const quotes =
        quoteLeads.map(
          (lead) => ({
            ...lead,

            leadType:
              "Proposta",

            route:
              "/admin/propostas",
          })
        );

      const testRides =
        testRideLeads.map(
          (lead) => ({
            ...lead,

            leadType:
              "Test Ride",

            route:
              "/admin/test-rides",
          })
        );

      return [
        ...quotes,
        ...testRides,
      ]
        .sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
        )
        .slice(
          0,
          6
        );
    }, [
      quoteLeads,
      testRideLeads,
    ]);

  function getStatusLabel(
    status
  ) {
    switch (status) {
      case "NEW":
        return "Novo";

      case "CONTACTED":
        return "Contatado";

      case "CLOSED":
        return "Fechado";

      case "CANCELLED":
        return "Cancelado";

      default:
        return status;
    }
  }

  function getStatusClass(
    status
  ) {
    switch (status) {
      case "NEW":
        return styles.statusNew;

      case "CONTACTED":
        return styles.statusContacted;

      case "CLOSED":
        return styles.statusClosed;

      case "CANCELLED":
        return styles.statusCancelled;

      default:
        return styles.statusDefault;
    }
  }

  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <main
        className={
          styles.dashboard
        }
      >
        <div
          className={
            styles.loading
          }
        >
          Carregando painel...
        </div>
      </main>
    );
  }

  return (
    <main
      className={
        styles.dashboard
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
            Administração
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Visão geral da operação
            comercial da TMotos.
          </p>
        </div>
      </header>

      {error && (
        <div
          className={
            styles.error
          }
          role="alert"
        >
          <TriangleAlert
            size={19}
          />

          <span>
            {error}
          </span>
        </div>
      )}

      {/* =========================================
          RESUMO PRINCIPAL
      ========================================== */}

      <section
        className={
          styles.summaryCards
        }
      >
        <article
          className={
            styles.summaryCard
          }
        >
          <div
            className={
              styles.cardIcon
            }
          >
            <Package
              size={22}
            />
          </div>

          <div>
            <span>
              Produtos
            </span>

            <strong>
              {
                summary.productsTotal
              }
            </strong>

            <small>
              {
                summary.productsActive
              }{" "}
              ativos
            </small>
          </div>
        </article>

        <article
          className={
            styles.summaryCard
          }
        >
          <div
            className={
              styles.cardIcon
            }
          >
            <FileText
              size={22}
            />
          </div>

          <div>
            <span>
              Propostas
            </span>

            <strong>
              {
                summary.quotesTotal
              }
            </strong>

            <small>
              {
                summary.quotesNew
              }{" "}
              novas
            </small>
          </div>
        </article>

        <article
          className={
            styles.summaryCard
          }
        >
          <div
            className={
              styles.cardIcon
            }
          >
            <Bike
              size={22}
            />
          </div>

          <div>
            <span>
              Test Rides
            </span>

            <strong>
              {
                summary.testRidesTotal
              }
            </strong>

            <small>
              {
                summary.testRidesNew
              }{" "}
              novos
            </small>
          </div>
        </article>

        <article
          className={
            styles.summaryCard
          }
        >
          <div
            className={
              styles.cardIcon
            }
          >
            <UserRoundCheck
              size={22}
            />
          </div>

          <div>
            <span>
              Leads novos
            </span>

            <strong>
              {
                summary.leadsNew
              }
            </strong>

            <small>
              {
                summary.leadsTotal
              }{" "}
              no total
            </small>
          </div>
        </article>
      </section>

      {/* =========================================
          ÁREAS
      ========================================== */}

      <section
        className={
          styles.sectionsGrid
        }
      >
        <article
          className={
            styles.panel
          }
        >
          <div
            className={
              styles.panelHeader
            }
          >
            <div>
              <span
                className={
                  styles.panelEyebrow
                }
              >
                Catálogo
              </span>

              <h2>
                Produtos
              </h2>
            </div>

            <Boxes
              size={21}
            />
          </div>

          <div
            className={
              styles.stats
            }
          >
            <div>
              <span>
                Total
              </span>

              <strong>
                {
                  summary.productsTotal
                }
              </strong>
            </div>

            <div>
              <span>
                Ativos
              </span>

              <strong>
                {
                  summary.productsActive
                }
              </strong>
            </div>

            <div>
              <span>
                Inativos
              </span>

              <strong>
                {
                  summary.productsInactive
                }
              </strong>
            </div>
          </div>

          <Link
            to="/admin/produtos"
            className={
              styles.panelLink
            }
          >
            Gerenciar produtos
          </Link>
        </article>

        <article
          className={
            styles.panel
          }
        >
          <div
            className={
              styles.panelHeader
            }
          >
            <div>
              <span
                className={
                  styles.panelEyebrow
                }
              >
                Comercial
              </span>

              <h2>
                Propostas
              </h2>
            </div>

            <FileText
              size={21}
            />
          </div>

          <div
            className={
              styles.stats
            }
          >
            <div>
              <span>
                Novas
              </span>

              <strong>
                {
                  summary.quotesNew
                }
              </strong>
            </div>

            <div>
              <span>
                Contatadas
              </span>

              <strong>
                {
                  summary.quotesContacted
                }
              </strong>
            </div>

            <div>
              <span>
                Fechadas
              </span>

              <strong>
                {
                  summary.quotesClosed
                }
              </strong>
            </div>
          </div>

          <Link
            to="/admin/propostas"
            className={
              styles.panelLink
            }
          >
            Ver propostas
          </Link>
        </article>

        <article
          className={
            styles.panel
          }
        >
          <div
            className={
              styles.panelHeader
            }
          >
            <div>
              <span
                className={
                  styles.panelEyebrow
                }
              >
                Atendimento
              </span>

              <h2>
                Test Rides
              </h2>
            </div>

            <Bike
              size={21}
            />
          </div>

          <div
            className={
              styles.stats
            }
          >
            <div>
              <span>
                Novos
              </span>

              <strong>
                {
                  summary.testRidesNew
                }
              </strong>
            </div>

            <div>
              <span>
                Contatados
              </span>

              <strong>
                {
                  summary.testRidesContacted
                }
              </strong>
            </div>

            <div>
              <span>
                Fechados
              </span>

              <strong>
                {
                  summary.testRidesClosed
                }
              </strong>
            </div>
          </div>

          <Link
            to="/admin/test-rides"
            className={
              styles.panelLink
            }
          >
            Ver Test Rides
          </Link>
        </article>
      </section>

      {/* =========================================
          LEADS RECENTES
      ========================================== */}

      <section
        className={
          styles.recentSection
        }
      >
        <div
          className={
            styles.recentHeader
          }
        >
          <div>
            <span
              className={
                styles.panelEyebrow
              }
            >
              Atendimento
            </span>

            <h2>
              Leads recentes
            </h2>
          </div>

          <ClipboardList
            size={21}
          />
        </div>

        {recentLeads.length ===
        0 ? (
          <div
            className={
              styles.empty
            }
          >
            Nenhum lead recebido
            ainda.
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
                    Cliente
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Produto
                  </th>

                  <th>
                    Data
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Ação
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentLeads.map(
                  (lead) => (
                    <tr
                      key={`${lead.leadType}-${lead.id}`}
                    >
                      <td>
                        <strong>
                          {lead.name}
                        </strong>

                        <small>
                          {lead.phone}
                        </small>
                      </td>

                      <td>
                        {
                          lead.leadType
                        }
                      </td>

                      <td>
                        {lead.productBrand}{" "}
                        {lead.productName}
                      </td>

                      <td>
                        {formatAdminDate(
                          lead.createdAt
                        )}
                      </td>

                      <td>
                        <span
                          className={`${styles.status} ${getStatusClass(
                            lead.status
                          )}`}
                        >
                          {getStatusLabel(
                            lead.status
                          )}
                        </span>
                      </td>

                      <td>
                        <Link
                          to={
                            lead.route
                          }
                          className={
                            styles.tableLink
                          }
                        >
                          Abrir
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div
        className={
          styles.health
        }
      >
        <CheckCircle2
          size={17}
        />

        <span>
          Dados carregados diretamente
          da operação atual da TMotos.
        </span>
      </div>
    </main>
  );
}

export default AdminDashboard;