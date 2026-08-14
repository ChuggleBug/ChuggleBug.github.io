
import "../App.css"
import "../styles/glass-button.css"

import logo from "../assets/logo.svg"
import { Link } from "react-router";

type HeaderButtonProps = {
  text: string;
};

export function HeaderButton({ text }: HeaderButtonProps) {
  return (
    <button className='px-10 py-3 glass-button font-bold text-white'>
      {text}
    </button>

    // <button className="hover:bg-app-purple-dark rounded px-7 py-1 transition-colors font-black text-light">
    //   {text}
    // </button>
  );
}

export default function AppNavigator() {
  return (
    <header className="flex w-full items-center p-10 gap-10">
      <Link to="/">
        <img src={logo} width={75} height={75}></img>
      </Link>

      <nav className='flex gap-5'>
        {/* Points to non-react managed website */}
        <a href='/blog'>
          <HeaderButton text='Blog' />
        </a>
        {/* <Link to='/soup'>
          <HeaderButton text='Test' />
        </Link> */}
      </nav>
      
    </header>   
  );
}