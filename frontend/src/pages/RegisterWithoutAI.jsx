import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterWithAI() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastRegisterPage = localStorage.getItem("lastRegisterPage");
    
    if (!lastRegisterPage) {
      localStorage.setItem("lastRegisterPage", "/register/without_ai");
    } else if (lastRegisterPage !== "/register/without_ai") {
      navigate(lastRegisterPage, { replace: true });
    }
  }, [navigate]);
  
  return (
    <RegisterForm
      title="Registro (Grupo sem IA)"
      apiEndpoint="/developer/without_ai"
    />
  );
}
