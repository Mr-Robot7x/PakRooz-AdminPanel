// components/NewSideBar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, User } from "lucide-react";

interface NewSideBarProps {
  color?: string;
  // Optional props can be added here, e.g., user role, to show/hide items conditionally.
}

const NewSideBar: React.FC<NewSideBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Toggle NewSideBar for mobile view
  const toggleNewSideBar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-full p-5 bg-gray-800 text-white transition-transform md:translate-x-0`}
    >
      {/* NewSideBar toggle button (for mobile) */}
      <button
        className="absolute top-5 right-5 md:hidden text-gray-300"
        onClick={toggleNewSideBar}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* NewSideBar Content */}
      <nav className="space-y-4 mt-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Home />
          <span className={pathname === "/" ? "font-semibold" : ""}>Home</span>
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <Settings />
          <span className={pathname === "/profile" ? "font-semibold" : ""}>
            Profile
          </span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 text-gray-300 hover:text-white"
        >
          <User />
          <span className={pathname === "/settings" ? "font-semibold" : ""}>
            Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default NewSideBar;
