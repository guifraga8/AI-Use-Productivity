import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Que feio!</h1>
      <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
        Você não deveria tentar acessar a página do desafio direto pela URL!
        <br />
        Vamos fazer isso do jeito certo agora.
        <br />
        Selecione abaixo o grupo ao qual você pertence para continuar!
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => navigate("/register/with_ai")}
            variant="contained"
          >
            Grupo com IA
          </Button>
          <Button
            onClick={() => navigate("/register/without_ai")}
            variant="contained"
          >
            Grupo sem IA
          </Button>
        </Stack>
      </div>
    </div>
  );
}
