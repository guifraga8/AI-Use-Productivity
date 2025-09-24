import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function RegisterForm({ title, apiEndpoint }) {
  const [form, setForm] = useState({ name: "", role: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        `${import.meta.env.VITE_API_URL}${apiEndpoint}`,
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

      const userData = await response.json();
      localStorage.setItem("registeredUser", JSON.stringify(userData));
      setSuccess(true);
      navigate("/challenge");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", width: "100%", marginTop: "10%" }}>
        <h1>{title}</h1>

        {success ? (
          <p>Registrado com sucesso!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "center" }}>
              <TextField
                required
                id="outlined-required"
                label="Preencha seu Nome e Sobrenome"
                placeholder="Ex.: Arthur Morgan"
                value={form.name}
                onChange={handleChange}
                name="name"
                sx={{ width: "320px" }}
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <TextField
                required
                id="outlined-required"
                label="Preencha seu cargo atual"
                placeholder="Ex.: Full Stack Developer"
                value={form.role}
                onChange={handleChange}
                name="role"
                sx={{ width: "320px" }}
              />
              <br />
              <br />
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? "Enviando..." : "Registrar"}
              </Button>
            </div>
            {error && (
              <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
