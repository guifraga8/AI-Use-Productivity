import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const adminName = localStorage.getItem("adminName");
  const adminRole = localStorage.getItem("adminRole");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Painel Central");
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/developer/challenges/`
      );
      const data = await res.json();
      setDevelopers(data);
    } catch (error) {
      console.error("Erro ao buscar desenvolvedores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter((dev) => {
    if (selectedMenu === "Resultados Desenvolvedores com IA") {
      return dev.developer.group_type === "with_ai";
    }
    if (selectedMenu === "Resultados Desenvolvedores sem IA") {
      return dev.developer.group_type === "without_ai";
    }
    return true;
  });

  const totalParticipants = developers.length;
  const participantsWithIA = developers.filter(
    (d) => d.developer.group_type === "with_ai"
  ).length;
  const participantsWithoutIA = developers.filter(
    (d) => d.developer.group_type === "without_ai"
  ).length;
  const totalFilesSent = developers.reduce(
    (acc, d) => acc + d.challenges.filter((c) => c.developerChallenge).length,
    0
  );

  const totalTimesAll = developers.reduce((acc, dev) => {
    return acc.concat(
      dev.challenges
        .filter((c) => c.total_time_ms !== null)
        .map((c) => c.total_time_ms)
    );
  }, []);

  const avgTimeMsAll = totalTimesAll.length
    ? totalTimesAll.reduce((sum, t) => sum + t, 0) / totalTimesAll.length
    : 0;

  const totalTimesFiltered = filteredDevelopers.reduce((acc, dev) => {
    return acc.concat(
      dev.challenges
        .filter((c) => c.total_time_ms !== null)
        .map((c) => c.total_time_ms)
    );
  }, []);

  const avgTimeMsFiltered = totalTimesFiltered.length
    ? totalTimesFiltered.reduce((sum, t) => sum + t, 0) /
      totalTimesFiltered.length
    : 0;

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const menuItems = [
    "Painel Central",
    "Resultados",
    "Resultados Desenvolvedores com IA",
    "Resultados Desenvolvedores sem IA",
  ];

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Desafio Técnico</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: "bold", display: "block" }}
              >
                {adminName}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                sx={{ display: "block" }}
              >
                {adminRole}
              </Typography>
            </Box>

            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ minWidth: "auto", padding: 0 }}
            >
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "primary.main",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((text) => (
            <ListItem
              button
              key={text}
              selected={selectedMenu === text}
              onClick={() => {
                setSelectedMenu(text);
                toggleDrawer(); // fecha ao clicar
              }}
            >
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {selectedMenu}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {selectedMenu === "Painel Central" ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        Total de participantes
                      </Typography>
                      <Typography variant="h4">{totalParticipants}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Com IA</Typography>
                      <Typography variant="h4">{participantsWithIA}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Sem IA</Typography>
                      <Typography variant="h4">{participantsWithoutIA}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Arquivos enviados</Typography>
                      <Typography variant="h4">{totalFilesSent}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Tempo médio</Typography>
                      <Typography variant="h4">
                        {formatTime(avgTimeMsAll)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ) : (
              <>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6">
                      Quantidade de participantes
                    </Typography>
                    <Typography variant="h4">
                      {filteredDevelopers.length}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Tempo médio do grupo: {formatTime(avgTimeMsFiltered)}
                    </Typography>
                  </CardContent>
                </Card>

                <Grid container spacing={2}>
                  {filteredDevelopers.map((dev) => (
                    <Grid item xs={12} sm={6} md={4} key={dev.developer.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">
                            {dev.developer.name}
                          </Typography>
                          <Typography variant="body2">
                            {dev.developer.role}
                          </Typography>
                          <Typography variant="body2">
                            Tempo para concluir o desafio:{" "}
                            {dev.challenges.length
                              ? formatTime(
                                  dev.challenges.reduce(
                                    (sum, c) => sum + (c.total_time_ms || 0),
                                    0
                                  )
                                )
                              : "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            Grupo:{" "}
                            {dev.developer.group_type === "with_ai"
                              ? "com IA"
                              : dev.developer.group_type === "without_ai"
                              ? "sem IA"
                              : dev.developer.group_type}
                          </Typography>
                          <Typography variant="body2">
                            Arquivo:{" "}
                            {dev.challenges.some((c) => c.developerChallenge)
                              ? dev.challenges
                                  .filter((c) => c.developerChallenge)
                                  .map((c) => c.developerChallenge.file_name)
                                  .join(", ")
                              : "N/A"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
}
