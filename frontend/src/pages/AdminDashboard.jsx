import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminAppBar from "../components/AdminAppBar";
import AdminDrawer from "../components/AdminDrawer";
import DashboardOverview from "../components/DashboardOverview";
import DevelopersList from "../components/DevelopersList";

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

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

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

  const totalTimesAll = developers.flatMap((dev) =>
    dev.challenges
      .filter((c) => c.total_time_ms !== null)
      .map((c) => c.total_time_ms)
  );

  const avgTimeMsAll = totalTimesAll.length
    ? totalTimesAll.reduce((sum, t) => sum + t, 0) / totalTimesAll.length
    : 0;

  const totalTimesFiltered = filteredDevelopers.flatMap((dev) =>
    dev.challenges
      .filter((c) => c.total_time_ms !== null)
      .map((c) => c.total_time_ms)
  );

  const avgTimeMsFiltered = totalTimesFiltered.length
    ? totalTimesFiltered.reduce((sum, t) => sum + t, 0) /
      totalTimesFiltered.length
    : 0;

  const formatTime = (ms) => {
    if (!ms || ms <= 0) return "0s";

    const totalSeconds = Math.round(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  const menuItems = [
    "Painel Central",
    "Resultados",
    "Resultados Desenvolvedores com IA",
    "Resultados Desenvolvedores sem IA",
  ];

  return (
    <>
      <AdminAppBar
        adminName={adminName}
        adminRole={adminRole}
        onToggleDrawer={toggleDrawer}
        onLogout={handleLogout}
      />

      <AdminDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        menuItems={menuItems}
        selectedMenu={selectedMenu}
        onSelect={setSelectedMenu}
      />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {selectedMenu}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : selectedMenu === "Painel Central" ? (
          <DashboardOverview
            totalParticipants={totalParticipants}
            participantsWithIA={participantsWithIA}
            participantsWithoutIA={participantsWithoutIA}
            totalFilesSent={totalFilesSent}
            avgTime={formatTime(avgTimeMsAll)}
          />
        ) : (
          <DevelopersList
            developers={filteredDevelopers}
            avgTime={avgTimeMsFiltered}
            formatTime={formatTime}
          />
        )}
      </Box>
    </>
  );
}
