import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminName");
    if (savedAdmin) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/developer/admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        setError("Acesso negado. Você não é um administrador.");
        return;
      }

      const data = await response.json();

      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminName", data.admin.name);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro na verificação: ", error);
      setError("Erro na verificação.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Login de Administrador</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Entrar
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}
