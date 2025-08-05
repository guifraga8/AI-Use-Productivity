import RegisterForm from "../components/RegisterForm";

export default function RegisterWithAI() {
  return (
    <RegisterForm
      title="Registro (Grupo sem IA)"
      apiEndpoint="/developer/without_ai"
    />
  );
}
