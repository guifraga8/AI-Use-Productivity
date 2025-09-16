import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Conclusion() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Valeu, {name}!</h1>
      <Button onClick={handleReset} variant="contained">
        Limpar localStorage e voltar
      </Button>
    </div>
  );
}
