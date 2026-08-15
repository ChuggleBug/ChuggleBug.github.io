
import "../App.css"
import { GlassButton } from "./GlassContent";

import logo from "../assets/logo.svg"
import { Link } from "react-router";

export default function AppNavigator() {
  return (
    <header className="flex w-full items-center p-10 gap-10">
      <Link to="/">
        <img src={logo} width={75} height={75}></img>
      </Link>

      <nav className='flex gap-5'>
        {/* Points to non-react managed website */}
        <a href='/blog'>
          <GlassButton>Blog</GlassButton>
        </a>
        <Link to='/about'>
          <GlassButton>About</GlassButton>
        </Link>
      </nav>

    </header>
  );
}