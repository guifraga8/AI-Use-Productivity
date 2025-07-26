import { useState } from "react";

export default function RegisterWithAI() {
  const [form, setForm] = useState({ name: "", role: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!form.name.trim() || !form.role.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/developer/with_ai`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao registrar.");
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px" }}>
      <h1>Registro (Grupo com IA)</h1>

      {success ? (
        <p>Registrado com sucesso!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>
              Nome:{" "}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Cargo:{" "}
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Enviando..." : "Registrar"}
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      )}
    </div>
  );
}
