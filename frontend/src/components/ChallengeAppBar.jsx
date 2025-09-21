import { AppBar, Toolbar, Box, Typography } from "@mui/material";

export default function ChallengeAppBar({ name, role }) {
  return (
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
  );
}
