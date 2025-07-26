import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterWithAI from "./pages/RegisterWithAI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register/with_ai" element={<RegisterWithAI />} />
      </Routes>
    </Router>
  );
}

export default App;
