import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "./ui/button";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-background text-foreground border-b border-border shadow-sm dark:bg-dark-background dark:text-dark-foreground dark:border-dark-border">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* לוגו */}
        <div className="text-2xl font-bold text-primary dark:text-dark-primary">
          GiveApp
        </div>

        {/* תפריט */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="/"
              className="hover:text-primary dark:hover:text-dark-primary"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className="hover:text-primary dark:hover:text-dark-primary"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/create"
              className="hover:text-primary dark:hover:text-dark-primary"
            >
              Create Project
            </a>
          </li>
          <li>
            <a
              href="/aboutPage"
              className="hover:text-primary dark:hover:text-dark-primary"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/SignupPage"
              className="hover:text-primary dark:hover:text-dark-primary"
            >
              Sign Up
            </a>
          </li>

          {/* כפתור Login */}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={openModal}
                  className="border border-border bg-secondary text-foreground hover:bg-muted dark:border-dark-border dark:bg-dark-secondary dark:text-dark-foreground dark:hover:bg-dark-muted"
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
