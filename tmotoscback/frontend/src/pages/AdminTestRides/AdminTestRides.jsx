import {
  useEffect,
  useState,
} from "react";

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

function AdminTestRides() {
  const {
    token,
    logout,
  } = useAdminAuth();

  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getTestRideLeads(
            token
          );

        setLeads(
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
          error.message ||
            "Não foi possível carregar os Test Rides."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [token]);

  async function handleStatus(
    id,
    status
  ) {
    try {
      setUpdatingId(id);
      setError("");

      const response =
        await updateTestRideLeadStatus(
          id,
          status,
          token
        );

      setLeads(
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
          "Erro ao atualizar o status."
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

        <strong
          className={
            styles.counter
          }
        >
          {leads.length}
        </strong>
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

      {loading ? (
        <p>
          Carregando Test Rides...
        </p>
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
                <th>Cliente</th>
                <th>Moto</th>
                <th>Telefone</th>
                <th>
                  Data desejada
                </th>
                <th>Período</th>
                <th>
                  Solicitação
                </th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map(
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
                      {formatAdminDate(
                        lead.preferredDate
                      )}
                    </td>

                    <td>
                      {TEST_RIDE_PERIOD_LABELS[
                        lead.period
                      ] ||
                        lead.period}
                    </td>

                    <td>
                      {formatAdminDate(
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
                          lead.id
                        }
                        onChange={(
                          event
                        ) =>
                          handleStatus(
                            lead.id,
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
                    </td>
                  </tr>
                )
              )}

              {leads.length ===
                0 && (
                <tr>
                  <td
                    colSpan="7"
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
      )}
    </main>
  );
}

export default AdminTestRides;