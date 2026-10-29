import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  FileText,
  Search,
  TriangleAlert,
} from "lucide-react";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getQuoteLeads,
  updateQuoteLeadStatus,
} from "../../services/adminService";

import {
  LEAD_STATUS_OPTIONS,
  formatAdminDate,
} from "../../constants/admin";

import styles from "./AdminQuotes.module.css";

const STATUS_LABELS =
  Object.fromEntries(
    LEAD_STATUS_OPTIONS.map(
      (option) => [
        option.value,
        option.label,
      ]
    )
  );

function AdminQuotes() {
  const {
    logout,
  } = useAdminAuth();

  const [
    leads,
    setLeads,
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
    success,
    setSuccess,
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
    statusFilter,
    setStatusFilter,
  ] = useState("ALL");

  /*
   * =====================================================
   * CARREGAMENTO
   * =====================================================
   */

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getQuoteLeads();

        setLeads(
          response.data ||
            []
        );
      } catch (error) {
        if (
          error.status === 401 ||
          error.status === 403
        ) {
          await logout();
          return;
        }

        setError(
          error.message ||
            "Não foi possível carregar as propostas."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [
    logout,
  ]);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer =
      setTimeout(() => {
        setSuccess("");
      }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  const newCount =
    useMemo(
      () =>
        leads.filter(
          (lead) =>
            lead.status ===
            "NEW"
        ).length,
      [leads]
    );

  const contactedCount =
    useMemo(
      () =>
        leads.filter(
          (lead) =>
            lead.status ===
            "CONTACTED"
        ).length,
      [leads]
    );

  const closedCount =
    useMemo(
      () =>
        leads.filter(
          (lead) =>
            lead.status ===
            "CLOSED"
        ).length,
      [leads]
    );

  const filteredLeads =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return leads.filter(
        (lead) => {
          const matchesSearch =
            !normalizedSearch ||
            [
              lead.name,
              lead.email,
              lead.phone,
              lead.productName,
              lead.productBrand,
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

          const matchesStatus =
            statusFilter ===
              "ALL" ||
            lead.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      leads,
      search,
      statusFilter,
    ]);

  async function handleStatus(
    lead,
    status
  ) {
    if (
      status ===
      lead.status
    ) {
      return;
    }

    try {
      setUpdatingId(
        lead.id
      );

      setError("");
      setSuccess("");

      const response =
        await updateQuoteLeadStatus(
          lead.id,
          status
        );

      setLeads(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              lead.id
                ? response.data
                : item
          )
      );

      setSuccess(
        `Status da proposta de "${lead.name}" alterado para "${STATUS_LABELS[status] || status}".`
      );
    } catch (error) {
      if (
        error.status === 401 ||
        error.status === 403
      ) {
        await logout();
        return;
      }

      setError(
        error.message ||
          "Não foi possível atualizar o status da proposta."
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
            Leads
          </span>

          <h1>
            Propostas
          </h1>

          <p>
            Solicitações comerciais
            recebidas pelo site.
          </p>
        </div>

        <div
          className={
            styles.counters
          }
        >
          <div
            className={
              styles.counter
            }
          >
            <FileText
              size={17}
            />

            <strong>
              {leads.length}
            </strong>

            <span>
              Total
            </span>
          </div>

          <div
            className={
              styles.newCounter
            }
          >
            <strong>
              {newCount}
            </strong>

            <span>
              Novas
            </span>
          </div>

          <div
            className={
              styles.contactedCounter
            }
          >
            <strong>
              {contactedCount}
            </strong>

            <span>
              Contatadas
            </span>
          </div>

          <div
            className={
              styles.closedCounter
            }
          >
            <strong>
              {closedCount}
            </strong>

            <span>
              Fechadas
            </span>
          </div>
        </div>
      </header>

      {success && (
        <div
          className={
            styles.success
          }
          role="status"
        >
          <CheckCircle2
            size={19}
          />

          <span>
            {success}
          </span>
        </div>
      )}

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
            placeholder="Buscar cliente, telefone ou moto..."
            value={
              search
            }
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

          {LEAD_STATUS_OPTIONS.map(
            (option) => (
              <option
                key={
                  option.value
                }
                value={
                  option.value
                }
              >
                {option.label}
              </option>
            )
          )}
        </select>
      </section>

      {!loading && (
        <div
          className={
            styles.resultInfo
          }
        >
          Exibindo{" "}
          <strong>
            {
              filteredLeads.length
            }
          </strong>{" "}
          de{" "}
          <strong>
            {leads.length}
          </strong>{" "}
          propostas
        </div>
      )}

      {loading ? (
        <div
          className={
            styles.loading
          }
        >
          Carregando propostas...
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
                  Moto
                </th>

                <th>
                  Telefone
                </th>

                <th>
                  Troca
                </th>

                <th>
                  Financiamento
                </th>

                <th>
                  Data
                </th>

                <th>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map(
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
                      <strong>
                        {lead.productBrand}{" "}
                        {lead.productName}
                      </strong>
                    </td>

                    <td>
                      {lead.phone}
                    </td>

                    <td>
                      <span
                        className={
                          lead.tradeIn
                            ? styles.yesBadge
                            : styles.noBadge
                        }
                      >
                        {lead.tradeIn
                          ? "Sim"
                          : "Não"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          lead.financing
                            ? styles.yesBadge
                            : styles.noBadge
                        }
                      >
                        {lead.financing
                          ? "Sim"
                          : "Não"}
                      </span>
                    </td>

                    <td>
                      {formatAdminDate(
                        lead.createdAt
                      )}
                    </td>

                    <td>
                      <select
                        className={
                          styles.statusSelect
                        }
                        value={
                          lead.status
                        }
                        disabled={
                          updatingId ===
                          lead.id
                        }
                        onChange={(
                          event
                        ) =>
                          handleStatus(
                            lead,
                            event
                              .target
                              .value
                          )
                        }
                      >
                        {LEAD_STATUS_OPTIONS.map(
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

                      {updatingId ===
                        lead.id && (
                        <small>
                          Salvando...
                        </small>
                      )}
                    </td>
                  </tr>
                )
              )}

              {filteredLeads.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
                    className={
                      styles.empty
                    }
                  >
                    Nenhuma proposta
                    encontrada com os
                    filtros selecionados.
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

export default AdminQuotes;