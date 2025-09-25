import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Stack } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import ChallengeInformation from "../components/ChallengeInformation";
import ChallengeAppBar from "../components/ChallengeAppBar";

export default function Upload() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const role = storedUser?.role;
  const developerId = storedUser?.id;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".zip")) {
      alert("Somente arquivos .zip são permitidos!");
      e.target.value = null;
      return;
    }

    e.target.value = null;
    setFile(selectedFile);

    await handleUpload(selectedFile);
  };

  const handleUpload = async (selectedFile) => {
    const fileToUpload = selectedFile || file;
    if (!fileToUpload) {
      return alert("Selecione um arquivo primeiro.");
    }

    const formData = new FormData();
    formData.append("solution", fileToUpload);
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
      alert("Arquivo salvo com sucesso!");
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
      <ChallengeAppBar name={name} role={role} />

      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Quando você concluir, envie sua solução do Desafio Técnico ao final da
          página!
        </Typography>

        <ChallengeInformation />

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

          <Typography variant="h8">
            Se já estiver seguro que encerrou o desafio e selecionou o arquivo correto,<br />
            clique no botão abaixo para finalizar o desafio!
          </Typography>

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
