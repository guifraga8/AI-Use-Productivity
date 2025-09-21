import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function Admin() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
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
      localStorage.setItem("adminRole", data.admin.role);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro na verificação: ", error);
      setError("Erro na verificação.");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "10%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Painel de Administrador</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          ></Box>
          <TextField
            required
            id="outlined-required"
            label="Nome"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </div>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}
