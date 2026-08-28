

import { BrowserRouter, Routes, Route } from "react-router";
import AppNavigator from "./components/AppNavigator";
import ParticleBackground from "./components/ParticleBackground";

import Home from "./pages/Home";
import About from "./pages/About";
import Stars from "./pages/Stars";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticleBackground />
          </div>

          <div className="fixed top-0 left-0 z-20">
            <AppNavigator />
          </div>

          <div className="absolute inset-0 z-10 h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/stars" element={<Stars />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      
    </div>
  );
}