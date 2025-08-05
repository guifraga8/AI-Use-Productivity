// src/pages/AdminDashboard.jsx
export default function AdminDashboard() {
  const adminName = localStorage.getItem("adminName");

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Olá, {adminName}!</h1>
    </div>
  );
}
