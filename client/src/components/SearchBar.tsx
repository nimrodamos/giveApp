import { useState, useEffect } from "react";
import { api } from "@/api";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void; // מעביר תוצאות חיפוש
}

const SearchBar = ({ onSearchResults }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/projects?title=${searchQuery}`);

      onSearchResults(response.data); // שליחת התוצאות להורה
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-background border border-border rounded-lg shadow-md p-2">
        <FiSearch className="text-muted-foreground ml-2" size={20} />
        <input
          type="text"
          placeholder="חפש פרויקט..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 focus:outline-none bg-transparent text-foreground"
        />
        {isLoading && (
          <div className="text-sm text-muted-foreground mr-2">טוען...</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
