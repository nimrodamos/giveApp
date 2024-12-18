import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LoginModal from "./LoginModal";
import { useTheme } from "./Theme-provider";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* לוגו */}
        <Link to="/" className="text-2xl font-bold text-primary">
          GiveApp
        </Link>

        {/* תפריט */}
        <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="/projects"
              className="relative font-bold hover:text-primary m-4 px-4 py-2 after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              פרויקטים
            </a>
          </li>
          <li>
            <a
              href="/create"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              להתחיל פרויקט
            </a>
          </li>
          {/* Toggle Dark Mode */}
          <li>
            <div className="flex items-center space-x-2 gap-2">
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              <span className="text-sm text-muted-foreground ">
                {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </span>
            </div>
          </li>

          {/* כפתור Login */}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={openModal}
                  className="border border-border bg-secondary text-foreground hover:bg-muted"
                >
                  Login
                </Button>
              </PopoverTrigger>
            </Popover>
          </li>
        </ul>
      </div>

      {/* קומפוננטת LoginModal */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
