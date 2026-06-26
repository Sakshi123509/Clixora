import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import AuthPages from "./pages/Auth.jsx";
import Generator from "./pages/Generator.jsx";
import CTAScore from "./pages/CTA_score.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Canvas from "./pages/Canvas.jsx";
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";

//  PROTECTED ROUTE WRAPPER COMPONENT
const ProtectedRoute = () => {
  // LocalStorage se token check karo (Apne auth logic ke hisab se badal sakte ho)
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, toh andar ke saare components normal render honge (Outlet ke through)
  return <Outlet />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/*  PUBLIC ROUTES (Inhe guest user bhi dekh sakta hai) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPages />} />

        {/* PROTECTED ROUTES (Sirf logged-in users ke liye open honge) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/generate" element={<Generator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/cta-score" element={<CTAScore />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <>
//       {isLoading ? (
//         // Loader will show first and automatically fire the state change at 100%
//         <Loader onLoadingComplete={() => setIsLoading(false)} />
//       ) : (
//         // Once loading finishes, push the login / registration layout
//         <AuthPage />
//       )}
//     </>
//   );
// }
