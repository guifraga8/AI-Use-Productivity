import { Grid, Card, CardContent, Typography } from "@mui/material";
import DeveloperCard from "./DeveloperCard";

export default function DevelopersList({ developers, avgTime, formatTime }) {
  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Quantidade de participantes</Typography>
          <Typography variant="h4">{developers.length}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Tempo médio do grupo: {formatTime(avgTime)}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {developers.map((dev) => (
          <Grid item xs={12} sm={6} md={4} key={dev.developer.id}>
            <DeveloperCard developer={dev} formatTime={formatTime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
