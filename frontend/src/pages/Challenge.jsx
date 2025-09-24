import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useState } from "react";
import ChallengeInformation from "../components/ChallengeInformation";
import ChallengeAppBar from "../components/ChallengeAppBar";

export default function Challenge() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const role = storedUser?.role;
  const developerId = storedUser?.id;
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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

  const handleDownload = () => {
    setDownloaded(true);
    window.location.href = `${import.meta.env.VITE_API_URL}/challenge/download`;
  };

  return (
    <>
      <ChallengeAppBar name={name} role={role} />

      <Box sx={{ p: 4, textAlign: "center" }}>
        {!agreed ? (
          <>
            <Typography variant="h4" gutterBottom>
              Bem-vindo(a), {name}, à página do Desafio Técnico
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Pedimos que você leia atentamente todas as informações do desafio
              antes de clicar no botão "Iniciar Desafio". <br />
              <br />O tempo estimado para concluir o desafio pode variar de 30 minutos a 1 hora,<br />
              dependendo do seu nível de experiência e conhecimento.<br />
              <br />Estando de acordo com as regras, basta clicar no botão "De acordo"
              abaixo.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAgreed(true)}
            >
              De acordo
            </Button>
          </>
        ) : (
          <>
            <ChallengeInformation></ChallengeInformation>

            <Stack spacing={3} alignItems="center">
              <Typography variant="h8">
                Clique no botão abaixo para fazer o Download do código fonte do desafio.<br />
                Prepare o seu ambiente, se organize com calma e apenas clique no próximo botão quando estiver seguro para iniciar o desafio!
              </Typography>

              <Button onClick={handleDownload} variant="contained">
                Baixar Desafio
              </Button>

              <Typography variant="h8">
                Quando você estiver 100% pronto, clique no botão "Iniciar Desafio".
              </Typography>

              <Button
                onClick={handleStart}
                variant="contained"
                color="success"
                disabled={!downloaded}>
                Iniciar Desafio
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
