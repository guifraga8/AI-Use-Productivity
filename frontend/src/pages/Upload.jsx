import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Upload() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const developerId = storedUser?.id;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return alert("Selecione um arquivo primeiro.");
    }

    const formData = new FormData();
    formData.append("solution", file);
    if (tmpFile) {
      formData.append("oldTmpFile", tmpFile);
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/challenge/upload`,
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
    <div style={{ padding: "2rem" }}>
      <h1>Olá, {name}. Envie sua solução do Desafio Técnico</h1>

      <input type="file" onChange={handleFileChange} />
      <br />
      <br />

      <Button onClick={handleUpload} variant="contained" disabled={!file}>
        Fazer Upload
      </Button>
      <br />
      <br />

      <Button
        onClick={handleFinish}
        variant="contained"
        color="success"
        disabled={!uploadedFile}
      >
        Finalizar Desafio
      </Button>
    </div>
  );
}
