import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { api } from "@/api";

interface SearchBarProps {
  searchQuery: string; // Receive searchQuery from parent
  setSearchQuery: (query: string) => void; // Receive setter function to change query
  onSearchResults: (results: any[]) => void;
  resetSearchQuery: () => void; // Receive reset function from parent
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearchResults,
}: SearchBarProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (searchQuery.length === 0) {
        onSearchResults([]);
        return;
      }
      const response = await api.get(`/projects?title=${searchQuery}`);
      onSearchResults(response.data);
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
          value={searchQuery} // controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // updates searchQuery
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
