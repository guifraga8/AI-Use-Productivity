import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Challenge() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const developerId = storedUser?.id;
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleStart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/challenge/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ developer_id: developerId }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao iniciar desafio");
      }

      const data = await response.json();
      console.log("Desafio iniciado:", data);

      navigate("/upload");
    } catch (error) {
      console.error("Erro ao iniciar desafio:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo(a), {name} à página do Desafio Técnico</h1>
      <p>Página comum para todos os participantes.</p>
      <Button
        href={`${import.meta.env.VITE_API_URL}/challenge/download`}
        variant="contained"
      >
        Baixar Desafio
      </Button>
      <br />
      <br />
      <Button onClick={handleReset} variant="contained">
        Limpar localStorage e voltar
      </Button>
      <br />
      <br />
      <Button onClick={handleStart} variant="contained">
        Iniciar Desafio
      </Button>
    </div>
  );
}
