import { Card, CardContent, Typography, Button } from "@mui/material";

export default function DeveloperCard({ developer, formatTime }) {
  const handleDownload = (fileName) => {
    window.open(`${import.meta.env.VITE_API_URL}/developer_challenge/download/${fileName}`, "_blank");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{developer.developer.name}</Typography>
        <Typography variant="body2">{developer.developer.role}</Typography>
        <Typography variant="body2">
          Tempo para concluir o desafio:{" "}
          {developer.challenges.length
            ? formatTime(
                developer.challenges.reduce(
                  (sum, c) => sum + (c.total_time_ms || 0),
                  0
                )
              )
            : "N/A"}
        </Typography>
        <Typography variant="body2">
          Grupo:{" "}
          {developer.developer.group_type === "with_ai"
            ? "com IA"
            : developer.developer.group_type === "without_ai"
            ? "sem IA"
            : developer.developer.group_type}
        </Typography>
        <Typography variant="body2">
          Arquivo:{" "}
          {developer.challenges.some((c) => c.developerChallenge)
            ? developer.challenges
                .filter((c) => c.developerChallenge)
                .map((c) => (
                  <div key={c.developerChallenge.file_name}>
                    {c.developerChallenge.file_name}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        handleDownload(c.developerChallenge.file_name)
                      }
                      style={{ marginLeft: "8px" }}
                    >
                      Baixar
                    </Button>
                  </div>
                ))
            : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
