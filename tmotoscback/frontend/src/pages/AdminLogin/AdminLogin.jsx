import {
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import useAdminAuth from "../../hooks/useAdminAuth";

function AdminLogin() {
  const navigate =
    useNavigate();

  const {
    login,
    isAuthenticated,
  } = useAdminAuth();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (isAuthenticated) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(
        email,
        password
      );

      navigate(
        "/admin",
        {
          replace: true,
        }
      );
    } catch (error) {
      setError(
        error.message ||
          "Não foi possível realizar o login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>
        Administração TMotos
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <label>
          E-mail

          <input
            type="email"
            value={email}
            onChange={(
              event
            ) =>
              setEmail(
                event.target
                  .value
              )
            }
            required
          />
        </label>

        <label>
          Senha

          <input
            type="password"
            value={password}
            onChange={(
              event
            ) =>
              setPassword(
                event.target
                  .value
              )
            }
            required
          />
        </label>

        {error && (
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Entrando..."
            : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default AdminLogin;