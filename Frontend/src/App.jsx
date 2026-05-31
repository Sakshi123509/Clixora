import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPages from "./pages/Auth.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
