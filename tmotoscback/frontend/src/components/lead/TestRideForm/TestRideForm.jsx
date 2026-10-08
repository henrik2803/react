import {
  useState,
} from "react";

import Button from "../../ui/Button/Button";

import styles from "./TestRideForm.module.css";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  preferredDate: "",
  period: "",
  message: "",
};

function getToday() {
  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      today.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function TestRideForm({
  product,
  onClose,
}) {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const today = getToday();

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (currentForm) => ({
        ...currentForm,
        [name]: value,
      })
    );

    setErrors(
      (currentErrors) => ({
        ...currentErrors,
        [name]: "",
      })
    );
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

    if (!form.preferredDate) {
      newErrors.preferredDate =
        "Escolha uma data.";
    } else if (
      form.preferredDate < today
    ) {
      newErrors.preferredDate =
        "Escolha uma data futura.";
    }

    if (!form.period) {
      newErrors.period =
        "Escolha um período.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
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

    /*
     * Futuramente:
     *
     * await createTestRideLead({
     *   productId: product.id,
     *   ...form,
     * });
     *
     * Nenhum dado pessoal será
     * salvo no localStorage.
     */

    setSubmitted(true);
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
          Test Ride
        </span>

        <h3>
          Solicitação preparada.
        </h3>

        <p>
          O agendamento foi validado
          pelo frontend. Quando
          conectarmos o backend,
          essa solicitação será
          enviada para a TMotos.
        </p>

        <div
          className={
            styles.successInfo
          }
        >
          <span>
            Moto
          </span>

          <strong>
            {product.brand}{" "}
            {product.name}
          </strong>

          <span>
            Data desejada
          </span>

          <strong>
            {form.preferredDate}
          </strong>

          <span>
            Período
          </span>

          <strong>
            {form.period ===
            "morning"
              ? "Manhã"
              : "Tarde"}
          </strong>
        </div>

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
          Moto selecionada
        </span>

        <strong>
          {product.brand}{" "}
          {product.name}
        </strong>
      </div>

      <div
        className={styles.field}
      >
        <label
          htmlFor="test-ride-name"
        >
          Nome *
        </label>

        <input
          id="test-ride-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          placeholder="Seu nome"
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

      <div
        className={styles.field}
      >
        <label
          htmlFor="test-ride-phone"
        >
          Telefone / WhatsApp *
        </label>

        <input
          id="test-ride-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="(00) 00000-0000"
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

      <div
        className={styles.field}
      >
        <label
          htmlFor="test-ride-email"
        >
          E-mail
        </label>

        <input
          id="test-ride-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="voce@email.com"
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
          styles.schedule
        }
      >
        <div
          className={styles.field}
        >
          <label
            htmlFor="test-ride-date"
          >
            Data desejada *
          </label>

          <input
            id="test-ride-date"
            name="preferredDate"
            type="date"
            min={today}
            value={
              form.preferredDate
            }
            onChange={
              handleChange
            }
          />

          {errors.preferredDate && (
            <span
              className={
                styles.error
              }
            >
              {
                errors.preferredDate
              }
            </span>
          )}
        </div>

        <div
          className={styles.field}
        >
          <label
            htmlFor="test-ride-period"
          >
            Período *
          </label>

          <select
            id="test-ride-period"
            name="period"
            value={form.period}
            onChange={
              handleChange
            }
          >
            <option value="">
              Selecione
            </option>

            <option value="morning">
              Manhã
            </option>

            <option value="afternoon">
              Tarde
            </option>
          </select>

          {errors.period && (
            <span
              className={
                styles.error
              }
            >
              {errors.period}
            </span>
          )}
        </div>
      </div>

      <div
        className={styles.field}
      >
        <label
          htmlFor="test-ride-message"
        >
          Observações
        </label>

        <textarea
          id="test-ride-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Alguma preferência ou observação?"
        />
      </div>

      <div
        className={styles.notice}
      >
        A data escolhida representa uma
        preferência. A confirmação do
        horário acontecerá após o
        contato da concessionária.
      </div>

      <Button type="submit">
        Solicitar Test Ride
      </Button>
    </form>
  );
}

export default TestRideForm;