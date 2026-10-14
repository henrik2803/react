import {
  useState,
} from "react";

import Button from "../../ui/Button/Button";

import {
  createQuoteLead,
} from "../../../services/leadService";

import styles from "./QuoteForm.module.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  tradeIn: false,
  financing: false,
  message: "",
};

function QuoteForm({
  product,
  onClose,
}) {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm(
      (currentForm) => ({
        ...currentForm,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    setErrors(
      (currentErrors) => ({
        ...currentErrors,
        [name]: "",
      })
    );

    setSubmitError("");
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Informe seu nome.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Informe seu telefone ou WhatsApp.";
    }

    if (
      form.email &&
      !form.email.includes("@")
    ) {
      newErrors.email =
        "Informe um e-mail válido.";
    }

    return newErrors;
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(
        validationErrors
      ).length
    ) {
      setErrors(
        validationErrors
      );

      return;
    }

    try {
      setLoading(true);
      setSubmitError("");

      await createQuoteLead({
        productId:
          product.id,

        name:
          form.name,

        phone:
          form.phone,

        email:
          form.email,

        tradeIn:
          form.tradeIn,

        financing:
          form.financing,

        message:
          form.message,
      });

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Erro ao enviar proposta:",
        error
      );

      setSubmitError(
        error.message ||
          "Não foi possível enviar a solicitação."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={
          styles.success
        }
      >
        <span
          className={
            styles.successLabel
          }
        >
          Proposta
        </span>

        <h3>
          Solicitação enviada.
        </h3>

        <p>
          Recebemos sua solicitação de
          proposta para{" "}
          <strong>
            {product.brand}{" "}
            {product.name}
          </strong>
          .
        </p>

        <p>
          A equipe da TMotos poderá
          entrar em contato pelos dados
          informados.
        </p>

        <Button
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        className={
          styles.productInfo
        }
      >
        <span>
          Modelo selecionado
        </span>

        <strong>
          {product.brand}{" "}
          {product.name}
        </strong>
      </div>

      <div className={styles.field}>
        <label htmlFor="quote-name">
          Nome *
        </label>

        <input
          id="quote-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          placeholder="Seu nome"
          disabled={loading}
        />

        {errors.name && (
          <span
            className={
              styles.error
            }
          >
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="quote-phone">
          Telefone / WhatsApp *
        </label>

        <input
          id="quote-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          disabled={loading}
        />

        {errors.phone && (
          <span
            className={
              styles.error
            }
          >
            {errors.phone}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="quote-email">
          E-mail
        </label>

        <input
          id="quote-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="voce@email.com"
          disabled={loading}
        />

        {errors.email && (
          <span
            className={
              styles.error
            }
          >
            {errors.email}
          </span>
        )}
      </div>

      <div
        className={
          styles.options
        }
      >
        <label
          className={
            styles.checkbox
          }
        >
          <input
            name="tradeIn"
            type="checkbox"
            checked={
              form.tradeIn
            }
            onChange={
              handleChange
            }
            disabled={loading}
          />

          <span>
            Tenho uma moto para dar
            como entrada
          </span>
        </label>

        <label
          className={
            styles.checkbox
          }
        >
          <input
            name="financing"
            type="checkbox"
            checked={
              form.financing
            }
            onChange={
              handleChange
            }
            disabled={loading}
          />

          <span>
            Tenho interesse em
            financiamento
          </span>
        </label>
      </div>

      <div className={styles.field}>
        <label htmlFor="quote-message">
          Mensagem
        </label>

        <textarea
          id="quote-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Conte como podemos ajudar..."
          disabled={loading}
        />
      </div>

      {submitError && (
        <span
          className={
            styles.error
          }
        >
          {submitError}
        </span>
      )}

      <div
        className={
          styles.notice
        }
      >
        Seus dados não serão armazenados
        no navegador.
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Enviando..."
          : "Enviar solicitação"}
      </Button>
    </form>
  );
}

export default QuoteForm;