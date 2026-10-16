import {
  useEffect,
  useMemo,
  useState,
} from "react";

import useAdminAuth from "../../hooks/useAdminAuth";

import {
  getQuoteLeads,
  getTestRideLeads,
} from "../../services/adminService";

import styles from "./AdminDashboard.module.css";

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
            "Não foi possível carregar o painel."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  const summary = useMemo(() => {
    const allLeads = [
      ...quoteLeads,
      ...testRideLeads,
    ];

    return {
      total: allLeads.length,

      quotes:
        quoteLeads.length,

      testRides:
        testRideLeads.length,

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
    };
  }, [
    quoteLeads,
    testRideLeads,
  ]);

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
          className={styles.card}
        >
          <span>
            Total de leads
          </span>

          <strong>
            {summary.total}
          </strong>
        </article>

        <article
          className={styles.card}
        >
          <span>
            Propostas
          </span>

          <strong>
            {summary.quotes}
          </strong>
        </article>

        <article
          className={styles.card}
        >
          <span>
            Test Rides
          </span>

          <strong>
            {summary.testRides}
          </strong>
        </article>

        <article
          className={styles.card}
        >
          <span>
            Novos
          </span>

          <strong>
            {summary.new}
          </strong>
        </article>

        <article
          className={styles.card}
        >
          <span>
            Contatados
          </span>

          <strong>
            {summary.contacted}
          </strong>
        </article>

        <article
          className={styles.card}
        >
          <span>
            Fechados
          </span>

          <strong>
            {summary.closed}
          </strong>
        </article>
      </section>
    </main>
  );
}

export default AdminDashboard;