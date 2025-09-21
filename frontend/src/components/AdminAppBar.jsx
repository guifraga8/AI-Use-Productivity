import { AppBar, Toolbar, Box, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminAppBar({ adminName, adminRole, onToggleDrawer, onLogout }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" edge="start" onClick={onToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Desafio Técnico</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: "bold", display: "block" }}>
              {adminName}
            </Typography>
            <Typography variant="body2">{adminRole}</Typography>
          </Box>

          <Button onClick={onLogout} color="inherit" sx={{ minWidth: "auto", p: 0 }}>
            <LogoutIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
