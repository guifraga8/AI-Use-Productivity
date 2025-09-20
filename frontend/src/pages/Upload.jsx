import { useState } from "react";
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
import { UploadFile } from "@mui/icons-material";

export default function Upload() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const role = storedUser?.role;
  const developerId = storedUser?.id;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Somente arquivos .zip são permitidos!");
      e.target.value = null;
      return;
    }
    setFile(selectedFile);

    setUploadedFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      return alert("Selecione um arquivo primeiro.");
    }

    const formData = new FormData();
    formData.append("solution", file);
    if (tmpFile) formData.append("oldTmpFile", tmpFile);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/challenge/upload?developer_id=${
        storedUser.id
      }&developer_name=${encodeURIComponent(storedUser.name)}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (response.ok) {
      setTmpFile(data.tmpFile);
      setUploadedFile(data.tmpFile);
      alert("Arquivo atualizado na pasta temporária.");
    } else {
      alert(data.error || "Erro no upload.");
    }
  };

  const handleFinish = async () => {
    if (!uploadedFile) return alert("Faça o upload primeiro.");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/challenge/end`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developer_id: developerId,
          tmpFile: uploadedFile,
        }),
      }
    );

    if (!response.ok) {
      return alert("Erro ao finalizar desafio.");
    }

    alert("Desafio finalizado!");
    navigate("/conclusion");
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
        <Typography variant="h4" gutterBottom>
          Quando você estiver pronto, envie sua solução do Desafio Técnico ao
          final da página!
        </Typography>

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

        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            component="label"
            color="primary"
            startIcon={<UploadFile />}
          >
            {file ? "Editar Arquivo (.zip)" : "Selecionar Arquivo (.zip)"}
            <input
              type="file"
              accept=".zip"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {file && (
            <Typography variant="body2">
              Arquivo selecionado: {file.name}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            Somente arquivos .zip são permitidos
          </Typography>

          <Button onClick={handleUpload} variant="contained" disabled={!file}>
            Fazer Upload
          </Button>

          <Button
            onClick={handleFinish}
            variant="contained"
            color="success"
            disabled={!uploadedFile}
          >
            Finalizar Desafio
          </Button>
        </Stack>
      </Box>
    </>
  );
}
