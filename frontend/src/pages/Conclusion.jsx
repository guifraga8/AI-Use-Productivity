import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Conclusion() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;
  const navigate = useNavigate();

  const handleReset = () => {
    const lastRegisterPage = localStorage.getItem("lastRegisterPage");

    localStorage.clear();
    navigate(lastRegisterPage);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Obrigado pela sua partitipação, {name}!</h1>
      <Button onClick={handleReset} variant="contained">
        Voltar ao início
      </Button>
    </div>
  );
}
