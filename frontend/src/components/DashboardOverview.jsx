import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function DashboardOverview({
  totalParticipants,
  participantsWithIA,
  participantsWithoutIA,
  totalFilesSent,
  avgTime,
}) {
  const cards = [
    { label: "Total de participantes", value: totalParticipants },
    { label: "Com IA", value: participantsWithIA },
    { label: "Sem IA", value: participantsWithoutIA },
    { label: "Arquivos enviados", value: totalFilesSent },
    { label: "Tempo médio", value: avgTime },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((c) => (
        <Grid item xs={12} sm={6} md={3} key={c.label}>
          <Card>
            <CardContent>
              <Typography variant="h6">{c.label}</Typography>
              <Typography variant="h4">{c.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
