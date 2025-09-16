import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import Home from "./pages/Home";
import RegisterWithAI from "./pages/RegisterWithAI";
import RegisterWithoutAI from "./pages/RegisterWithoutAI";
import PrivateRouteRegister from "./routes/PrivateRouteRegister";
import Challenge from "./pages/Challenge";
import Upload from "./pages/Upload";
import Conclusion from "./pages/Conclusion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRouteAdmin>
              <AdminDashboard />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/register/with_ai"
          element={
            <PrivateRouteRegister requiresRegistration={false}>
              <RegisterWithAI />
            </PrivateRouteRegister>
          }
        />
        <Route
          path="/register/without_ai"
          element={
            <PrivateRouteRegister requiresRegistration={false}>
              <RegisterWithoutAI />
            </PrivateRouteRegister>
          }
        />
        <Route
          path="/challenge"
          element={
            <PrivateRouteRegister requiresRegistration={true}>
              <Challenge />
            </PrivateRouteRegister>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRouteRegister requiresRegistration={true}>
              <Upload />
            </PrivateRouteRegister>
          }
        />
        <Route
          path="/conclusion"
          element={
            <PrivateRouteRegister requiresRegistration={true}>
              <Conclusion />
            </PrivateRouteRegister>
          }
        />
        <Route path="/register" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
