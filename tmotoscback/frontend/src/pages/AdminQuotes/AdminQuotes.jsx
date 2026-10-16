import {
  useEffect,
  useState,
} from "react";

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

function AdminQuotes() {
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

        const response =
          await getQuoteLeads(
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
          error.message
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

      const response =
        await updateQuoteLeadStatus(
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
          Carregando propostas...
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
                <th>Troca</th>
                <th>
                  Financiamento
                </th>
                <th>Data</th>
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
                    Nenhuma proposta
                    encontrada.
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