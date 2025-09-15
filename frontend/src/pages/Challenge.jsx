import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Challenge() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo(a), {name} à página do Desafio Técnico</h1>
      <p>Página comum para todos os participantes.</p>
      <Button href={`${import.meta.env.VITE_API_URL}/challenge/download`}
              variant="contained"
      >
        Baixar Desafio
      </Button>
      <br />
      <br />
      <Button onClick={handleReset} variant="contained">
        Limpar localStorage e voltar
      </Button>
    </div>
  );
}
