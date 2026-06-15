import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthPages from "./pages/Auth.jsx";
import Generator from "./pages/Generator.jsx";
import CTAScore from "./pages/CTA_score.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Canvas from "./pages/Canvas.jsx";
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Loader/>}/> */}
        <Route path="/login" element={<AuthPages />} />
        <Route path="/generate" element={<Generator />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/cta-score" element={<CTAScore />} />
      </Routes>
      <Footer/>
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