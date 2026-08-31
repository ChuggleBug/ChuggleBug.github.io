

import { HashRouter, Routes, Route } from "react-router";
import AppNavigator from "./components/AppNavigator";
import ParticleBackground from "./components/ParticleBackground";

import Home from "./pages/Home";
import About from "./pages/About";
import Stars from "./pages/Stars";
import Toys from "./pages/Toys";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <HashRouter>
        <div className="relative h-full w-full">
          <AppNavigator />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/toys" element={<Toys />} />
          </Routes>


          <div className="fixed inset-0 -z-10 pointer-events-none">
            <ParticleBackground />
          </div>
        </div>
      </HashRouter>

    </div>
  );
}