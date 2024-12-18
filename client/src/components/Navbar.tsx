import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LoginModal from "./LoginModal";
import { useTheme } from "./Theme-provider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* לוגו */}
        <div className="text-2xl font-bold text-primary">GiveApp</div>

        {/* תפריט */}
        <ul className="flex space-x-6 items-center">
          <li>
            <a href="/" className="hover:text-primary">
              Home
            </a>
          </li>
          <li>
            <a href="/projects" className="hover:text-primary">
              Projects
            </a>
          </li>
          <li>
            <a href="/create" className="hover:text-primary">
              Create Project
            </a>
          </li>

          {/* Toggle Dark Mode */}
          <li>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {theme === "light" ? "Light" : "Dark"}
              </span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
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
