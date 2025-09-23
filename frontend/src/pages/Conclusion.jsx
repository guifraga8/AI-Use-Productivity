import { Button, Typography } from "@mui/material";

export default function Conclusion() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;

  const handleReset = () => {
    const lastRegisterPage = localStorage.getItem("lastRegisterPage");

    if (lastRegisterPage == "/register/with_ai") {
      window.open("https://forms.gle/WXaVzqq5E8Y7to35A", "_self");
    } else if (lastRegisterPage == "/register/without_ai") {
      window.open("https://forms.gle/GDqFh6NzRQNbiSzR8", "_self");
    }
    localStorage.clear();
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Obrigado pela sua partitipação, {name}!</h1>
      <Typography variant="h6">
        Agora que você finalizou o desafio, clique no botão abaixo<br />
        para realizar o preenchimento do formulário de feedback!
      </Typography>
      <br />
      <Button onClick={handleReset} variant="contained">
        Preencher formulário
      </Button>
    </div>
  );
}
