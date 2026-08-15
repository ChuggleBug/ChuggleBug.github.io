

import { BrowserRouter, Routes, Route } from "react-router";
import AppNavigator from "./components/AppNavigator";
import ParticleBackground from "./components/ParticleBackground";

import Home from "./pages/Home";
import About from "./pages/About";
import { Empty } from "./pages/Empty";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-0">
            <ParticleBackground />
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="pointer-events-auto">
              <AppNavigator />
            </div>
          </div>

          <div className="z-10 h-full relative inset-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/stars" element={<Empty />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}