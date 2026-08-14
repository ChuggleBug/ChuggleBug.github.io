

import { BrowserRouter, Routes, Route } from "react-router";
import AppNavigator from "./components/AppNavigator";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <div className="absolute">
          <AppNavigator/>
        </div>
        
        {/* Routes */}
        <Routes>
          /* <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>

      </BrowserRouter>

    </div>
  );
}