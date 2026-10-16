import {
  useEffect,
  useMemo,
  useState,
} from "react";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getQuoteLeads,
  getTestRideLeads,
  updateQuoteLeadStatus,
  updateTestRideLeadStatus,
} from "../../services/adminService";

import styles from "./AdminDashboard.module.css";

const STATUS_OPTIONS = [
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

const PERIOD_LABELS = {
  MORNING: "Manhã",
  AFTERNOON: "Tarde",
};

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString(
    "pt-BR"
  );
}

function AdminDashboard() {
  const {
    token,
    logout,
  } = useAdminAuth();

  const [
    quoteLeads,
    setQuoteLeads,
  ] = useState([]);

  const [
    testRideLeads,
    setTestRideLeads,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          quotesResponse,
          testRidesResponse,
        ] = await Promise.all([
          getQuoteLeads(token),
          getTestRideLeads(token),
        ]);

        setQuoteLeads(
          quotesResponse.data || []
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
            "Não foi possível carregar os dados."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token, logout]);

  const allLeads =
    useMemo(
      () => [
        ...quoteLeads,
        ...testRideLeads,
      ],
      [
        quoteLeads,
        testRideLeads,
      ]
    );

  const summary = useMemo(
    () => ({
      total: allLeads.length,

      new: allLeads.filter(
        (lead) =>
          lead.status === "NEW"
      ).length,

      contacted:
        allLeads.filter(
          (lead) =>
            lead.status ===
            "CONTACTED"
        ).length,

      closed:
        allLeads.filter(
          (lead) =>
            lead.status ===
            "CLOSED"
        ).length,

      cancelled:
        allLeads.filter(
          (lead) =>
            lead.status ===
            "CANCELLED"
        ).length,
    }),
    [allLeads]
  );

  async function handleQuoteStatus(
    id,
    status
  ) {
    try {
      setUpdatingId(
        `quote-${id}`
      );

      const response =
        await updateQuoteLeadStatus(
          id,
          status,
          token
        );

      setQuoteLeads(
        (current) =>
          current.map(
            (lead) =>
              lead.id === id
                ? response.data
                : lead
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
        error.message ||
          "Erro ao atualizar status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleTestRideStatus(
    id,
    status
  ) {
    try {
      setUpdatingId(
        `testRide-${id}`
      );

      const response =
        await updateTestRideLeadStatus(
          id,
          status,
          token
        );

      setTestRideLeads(
        (current) =>
          current.map(
            (lead) =>
              lead.id === id
                ? response.data
                : lead
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
        error.message ||
          "Erro ao atualizar status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <main
        className={
          styles.dashboard
        }
      >
        <p>
          Carregando painel...
        </p>
      </main>
    );
  }

  return (
    <main
      className={
        styles.dashboard
      }
    >
      <div
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
            Painel TMotos
          </h1>

          <p>
            Acompanhe propostas e
            agendamentos de Test Ride.
          </p>
        </div>

        <button
          type="button"
          className={
            styles.logoutButton
          }
          onClick={logout}
        >
          Sair
        </button>
      </div>

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
          styles.cards
        }
      >
        <article
          className={
            styles.card
          }
        >
          <span>
            Total de leads
          </span>

          <strong>
            {summary.total}
          </strong>
        </article>

        <article
          className={
            styles.card
          }
        >
          <span>
            Novos
          </span>

          <strong>
            {summary.new}
          </strong>
        </article>

        <article
          className={
            styles.card
          }
        >
          <span>
            Contatados
          </span>

          <strong>
            {summary.contacted}
          </strong>
        </article>

        <article
          className={
            styles.card
          }
        >
          <span>
            Fechados
          </span>

          <strong>
            {summary.closed}
          </strong>
        </article>

        <article
          className={
            styles.card
          }
        >
          <span>
            Cancelados
          </span>

          <strong>
            {summary.cancelled}
          </strong>
        </article>
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
          <div>
            <h2>
              Propostas
            </h2>

            <p>
              Solicitações comerciais
              recebidas.
            </p>
          </div>

          <span
            className={
              styles.counter
            }
          >
            {quoteLeads.length}
          </span>
        </div>

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
                <th>Cliente</th>
                <th>Moto</th>
                <th>Contato</th>
                <th>Troca</th>
                <th>
                  Financiamento
                </th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {quoteLeads.map(
                (lead) => (
                  <tr
                    key={
                      lead.id
                    }
                  >
                    <td>
                      <strong>
                        {lead.name}
                      </strong>

                      <small>
                        {lead.email ||
                          "Sem e-mail"}
                      </small>
                    </td>

                    <td>
                      {lead.productBrand}{" "}
                      {lead.productName}
                    </td>

                    <td>
                      {lead.phone}
                    </td>

                    <td>
                      {lead.tradeIn
                        ? "Sim"
                        : "Não"}
                    </td>

                    <td>
                      {lead.financing
                        ? "Sim"
                        : "Não"}
                    </td>

                    <td>
                      {formatDate(
                        lead.createdAt
                      )}
                    </td>

                    <td>
                      <select
                        value={
                          lead.status
                        }
                        disabled={
                          updatingId ===
                          `quote-${lead.id}`
                        }
                        onChange={(
                          event
                        ) =>
                          handleQuoteStatus(
                            lead.id,
                            event
                              .target
                              .value
                          )
                        }
                        className={
                          styles.statusSelect
                        }
                      >
                        {STATUS_OPTIONS.map(
                          (
                            option
                          ) => (
                            <option
                              key={
                                option.value
                              }
                              value={
                                option.value
                              }
                            >
                              {
                                option.label
                              }
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                )
              )}

              {quoteLeads.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
                    className={
                      styles.empty
                    }
                  >
                    Nenhuma proposta
                    encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
          <div>
            <h2>
              Test Rides
            </h2>

            <p>
              Agendamentos solicitados
              pelos clientes.
            </p>
          </div>

          <span
            className={
              styles.counter
            }
          >
            {testRideLeads.length}
          </span>
        </div>

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
                <th>Cliente</th>
                <th>Moto</th>
                <th>Contato</th>
                <th>
                  Data desejada
                </th>
                <th>Período</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {testRideLeads.map(
                (lead) => (
                  <tr
                    key={
                      lead.id
                    }
                  >
                    <td>
                      <strong>
                        {lead.name}
                      </strong>

                      <small>
                        {lead.email ||
                          "Sem e-mail"}
                      </small>
                    </td>

                    <td>
                      {lead.productBrand}{" "}
                      {lead.productName}
                    </td>

                    <td>
                      {lead.phone}
                    </td>

                    <td>
                      {formatDate(
                        lead.preferredDate
                      )}
                    </td>

                    <td>
                      {PERIOD_LABELS[
                        lead.period
                      ] ||
                        lead.period}
                    </td>

                    <td>
                      <select
                        value={
                          lead.status
                        }
                        disabled={
                          updatingId ===
                          `testRide-${lead.id}`
                        }
                        onChange={(
                          event
                        ) =>
                          handleTestRideStatus(
                            lead.id,
                            event
                              .target
                              .value
                          )
                        }
                        className={
                          styles.statusSelect
                        }
                      >
                        {STATUS_OPTIONS.map(
                          (
                            option
                          ) => (
                            <option
                              key={
                                option.value
                              }
                              value={
                                option.value
                              }
                            >
                              {
                                option.label
                              }
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                )
              )}

              {testRideLeads.length ===
                0 && (
                <tr>
                  <td
                    colSpan="6"
                    className={
                      styles.empty
                    }
                  >
                    Nenhum Test Ride
                    encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;