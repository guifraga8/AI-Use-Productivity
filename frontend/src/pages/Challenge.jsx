import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Stack,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

export default function Challenge() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const role = storedUser?.role;
  const developerId = storedUser?.id;
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);

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
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Desafio Técnico
          </Typography>

          <Box sx={{ textAlign: "right" }}>
            <Typography
              component="span"
              variant="body1"
              sx={{ fontWeight: "bold", display: "block" }}
            >
              {name}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{ display: "block" }}
            >
              {role}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4, textAlign: "center" }}>
        {!agreed ? (
          <>
            <Typography variant="h4" gutterBottom>
              Bem-vindo(a), {name}, à página do Desafio Técnico
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Leia atentamente todas as informações do desafio antes de clicar
              no botão abaixo.
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
            <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "left" }}>
              <Typography variant="body1" paragraph>
                Aqui você pode colocar a descrição completa do desafio, prints,
                instruções e todos os detalhes que os participantes precisam
                conhecer.
              </Typography>

              <Stack spacing={2}>
                <Box
                  component="img"
                  src="/images/print1.png"
                  alt="Print do desafio 1"
                  sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
                />

                <Box
                  component="img"
                  src="/images/print2.png"
                  alt="Print do desafio 2"
                  sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
                />
              </Stack>
            </Paper>

            <Stack spacing={3} alignItems="center">
              <Button
                href={`${import.meta.env.VITE_API_URL}/challenge/download`}
                variant="contained"
              >
                Baixar Desafio
              </Button>

              <Typography variant="h6">
                Quando você estiver pronto, clique no botão "Iniciar Desafio".
              </Typography>

              <Button onClick={handleStart} variant="contained" color="success">
                Iniciar Desafio
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
