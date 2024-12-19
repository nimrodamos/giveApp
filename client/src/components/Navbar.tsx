import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import LoginModal from "./LoginModal";
import { useTheme } from "./Theme-provider";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useUser } from "./context/userContext";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "./ui/avatar";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import SearchBar from "./SearchBar";
import { Project } from "@/types/projectTypes";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      const response = await api.get("/users/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(null);
        toast({
          title: "ההתנתקות בוצעה בהצלחה",
          description: "כל הכבוד שהתנתקת",
        });
        navigate("/");
      } else {
        toast({
          title: "אירעה שגיאה",
          description: "לא הצלחנו להתנתק",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "אירעה שגיאה",
        description: "לא הצלחנו להתנתק",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer mt-4">
          <AvatarImage
            className="rounded-full w-10 h-10"
            src={user?.profilePic || "CN"}
            alt="user-avatar"
          />
          <AvatarFallback className="rounded-full">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-1 text-center">
        <DropdownMenuLabel>המשתמש שלי</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile" className="ml-auto">
          <DropdownMenuItem>פרופיל</DropdownMenuItem>
        </Link>
        <Link to="/settings" className="ml-auto">
          <DropdownMenuItem>הגדרות</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout} className="ml-auto">
          <LogOut />
          <span className="ml-auto">התנתקות</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, setUser } = useUser();
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchResults = (results: Project[]) => {
    setSearchResults(results);
    if (results.length === 0) setSearchResults([]);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const resetSearchQuery = () => {
    setSearchQuery(""); // Reset the search query
  };

  const handleSelectResult = () => {
    setSearchResults([]); // איפוס תוצאות אחרי בחירה
    resetSearchQuery();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me", { withCredentials: true });
        if (response.status === 200) setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground border-b border-border shadow-sm">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
        >
          <span
            className="text-primary inline-block animate-fadeInScale shadow-md transform transition-transform duration-500 hover:-translate-y-1"
            style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)" }}
          >
            APP
          </span>
          <span
            className="text-primary inline-block animate-fadeInScale delay-150 shadow-md transform transition-transform duration-500 hover:-translate-y-1 scale-110"
            style={{ textShadow: "0px 2px 6px rgba(0, 0, 0, 0.4)" }}
          >
            GIVE
          </span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="block md:hidden text-primary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQueryChange}
            onSearchResults={handleSearchResults}
            resetSearchQuery={resetSearchQuery}
          />
        </div>

        {/* Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center space-y-4 md:space-y-0 absolute md:static top-16 right-0 bg-background md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-md md:shadow-none z-50`}
        >
          <li>
            <a
              href="/projects"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              פרויקטים
            </a>
          </li>
          <li>
            <a
              href="/projectInfo"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              להתחיל פרויקט
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              קצת עלינו
            </a>
          </li>
          <li>
            <div className="flex items-center space-x-2 gap-2">
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              <span className="text-sm text-muted-foreground">
                {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </span>
            </div>
          </li>
          <li>
            {!isLoggedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={openModal}
                    className="border border-border bg-secondary text-foreground hover:bg-primary"
                  >
                    כניסה
                  </Button>
                </PopoverTrigger>
              </Popover>
            ) : (
              <UserMenu />
            )}
          </li>
        </ul>
      </div>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-card p-4 mt-2 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-primary">
            תוצאות חיפוש:
          </h3>
          <ul>
            {searchResults.map((project) => (
              <Link
                to={`/projects/${project._id}`}
                state={{ project }}
                key={project._id}
                onClick={handleSelectResult}
              >
                <h4 className="font-bold text-primary mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      )}

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
