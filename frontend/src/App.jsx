import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import Home from "./pages/Home";
import RegisterWithAI from "./pages/RegisterWithAI";
import RegisterWithoutAI from "./pages/RegisterWithoutAI";
import PrivateRoute from "./routes/PrivateRoute";
import Challenge from "./pages/Challenge";
import Upload from "./pages/Upload";
import Conclusion from "./pages/Conclusion";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
            <PrivateRoute
              requiresRegistration={false}
              redirectIfRegistered="/challenge"
            >
              <RegisterWithAI />
            </PrivateRoute>
          }
        />
        <Route
          path="/register/without_ai"
          element={
            <PrivateRoute
              requiresRegistration={false}
              redirectIfRegistered="/challenge"
            >
              <RegisterWithoutAI />
            </PrivateRoute>
          }
        />
        <Route
          path="/challenge"
          element={
            <PrivateRoute requiresRegistration={true} redirectIfNotRegistered="/">
              <Challenge />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute requiresRegistration={true} redirectIfNotRegistered="/">
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/conclusion"
          element={
            <PrivateRoute requiresRegistration={true} redirectIfNotRegistered="/">
              <Conclusion />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
