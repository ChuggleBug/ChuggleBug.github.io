
import "../App.css"
import "../styles/sidebar.css"
import { GlassButton } from "./GlassContent";
import { GiHamburgerMenu } from "react-icons/gi";

import useWindowDimensions from "../utils/window-dimension";
import logo from "../assets/logo.svg"
import { Link } from "react-router";
import { useCallback, useEffect, useState } from "react";


function SidebarNavigator() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      setIsOpen(false);
    }
  }, [])

  return (
    <>
      {/* Open Sidebar button */}
      <div className="fixed z-10 top-5 left-5" onClick={toggleOpen}>
        <GlassButton className="p-2">
          <GiHamburgerMenu size={30} />
        </GlassButton>
      </div>

      {/* Sidebar content */}
      <nav className={`z-10 sidebar ${isOpen && `open`}`}>
        <div className="relative flex flex-col gap-5 w-full top-5 left-5">

          <div className="flex flex-row items-center gap-2">
            <div className="p-2" onClick={toggleOpen}>
              <GiHamburgerMenu size={30} color='white' />
            </div>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img className="select-none" src={logo} width={30} height={30}></img>
            </Link>
          </div>

          {/* Points to non-react managed website */}
          <a href='/blog' onClick={() => setIsOpen(false)}>
            <GlassButton className="py-3 min-w-20">Blog</GlassButton>
          </a>
          <Link to='/about' onClick={() => setIsOpen(false)}>
            <GlassButton className="py-3 min-w-20">About</GlassButton>
          </Link>
        </div>
      </nav>

      {/* Blur layer */}
      <div className={`fixed z-0 inset-0 w-screen h-screen sidebar-blur ${isOpen && `show`} `} onClick={() => setIsOpen(false)}></div>
    </>
  );
}

function DefaultNavigator() {
  return (
    <header className="flex w-full items-center p-10 gap-10">
      <Link to="/">
        <img className="select-none" src={logo} width={75} height={75}></img>
      </Link>

      <nav className='flex gap-5'>
        {/* Points to non-react managed website */}
        <a href='/blog'>
          <GlassButton className="py-3 min-w-20">Blog</GlassButton>
        </a>
        <Link to='/about'>
          <GlassButton className="py-3 min-w-20">About</GlassButton>
        </Link>
      </nav>

    </header>
  );
}


export default function AppNavigator() {
  // Does not ignore '_' for some reason
  // @ts-ignore
  const { _, width } = useWindowDimensions();

  // Medium screens and smaller get a sidebar
  return width > 768 ? <DefaultNavigator /> : <SidebarNavigator />;
}