import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./search";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-kick-gray text-white w-full justify-between items-center p-4">
        <Link href="/" passHref>
          <img src="/KickBetaIcon.svg" alt="Logo" className="cursor-pointer" />
        </Link>

        <SearchBar />
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex bg-kick-gray text-white w-full justify-between items-center p-4">
        <Link href="/" passHref>
          <img
            src="/KickIcon.svg"
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
          />
        </Link>

        <button
          onClick={toggleNavbar}
          aria-label="Menu Toggle"
          className="z-50"
        >
          {isOpen ? (
            <Cross1Icon width={28} height={28} />
          ) : (
            <HamburgerMenuIcon width={28} height={28} />
          )}
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="relative w-full h-full flex flex-col">
              <button
                onClick={toggleNavbar}
                aria-label="Menu Toggle"
                className="absolute top-4 right-4 z-50"
              >
                <Cross1Icon width={28} height={28} />
              </button>

              <div className="bg-kick-gray text-white p-4 flex flex-col items-center pt-20 flex-grow">
                <SearchBar />
              </div>

              <footer className="text-center w-full p-4 bg-kick-gray text-white">
                © {new Date().getFullYear()} Made with kick.com-api
              </footer>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default CustomNavbar;
