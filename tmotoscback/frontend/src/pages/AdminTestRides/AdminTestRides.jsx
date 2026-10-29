import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  CheckCircle2,
  Search,
  TriangleAlert,
} from "lucide-react";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getTestRideLeads,
  updateTestRideLeadStatus,
} from "../../services/adminService";

import {
  LEAD_STATUS_OPTIONS,
  TEST_RIDE_PERIOD_LABELS,
  formatAdminDate,
} from "../../constants/admin";

import styles from "./AdminTestRides.module.css";

const STATUS_LABELS =
  Object.fromEntries(
    LEAD_STATUS_OPTIONS.map(
      (option) => [
        option.value,
        option.label,
      ]
    )
  );

function AdminTestRides() {
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

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getTestRideLeads();

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
            "Não foi possível carregar os Test Rides."
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
        await updateTestRideLeadStatus(
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
        `Status do Test Ride de "${lead.name}" alterado para "${STATUS_LABELS[status] || status}".`
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
          "Não foi possível atualizar o status do Test Ride."
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
            Test Rides
          </h1>

          <p>
            Agendamentos solicitados
            pelos clientes.
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
            <CalendarDays
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
              Novos
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
              Contatados
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
              Fechados
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
          Test Rides
        </div>
      )}

      {loading ? (
        <div
          className={
            styles.loading
          }
        >
          Carregando Test Rides...
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
                  Data desejada
                </th>

                <th>
                  Período
                </th>

                <th>
                  Solicitação
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
                      {formatAdminDate(
                        lead.preferredDate
                      )}
                    </td>

                    <td>
                      <span
                        className={
                          styles.periodBadge
                        }
                      >
                        {TEST_RIDE_PERIOD_LABELS[
                          lead.period
                        ] ||
                          lead.period}
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
                    Nenhum Test Ride
                    encontrado com os
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

export default AdminTestRides;