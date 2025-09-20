import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterWithAI() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== null && localStorage.getItem("adminName") !== null) {
      localStorage.clear();
    }

    const lastRegisterPage = localStorage.getItem("lastRegisterPage");
    
    if (!lastRegisterPage) {
      localStorage.setItem("lastRegisterPage", "/register/with_ai");
    } else if (lastRegisterPage !== "/register/with_ai") {
      navigate(lastRegisterPage, { replace: true });
    }
  }, [navigate]);
  
  return (
    <RegisterForm
      title="Registro (Grupo com IA)"
      apiEndpoint="/developer/with_ai"
    />
  );
}
