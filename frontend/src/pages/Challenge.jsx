export default function Challenge() {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const name = storedUser?.name;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo(a), {name} à página do Desafio Técnico</h1>
      <p>Página comum para todos os participantes.</p>
    </div>
  );
}
