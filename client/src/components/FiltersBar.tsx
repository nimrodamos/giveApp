import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FiltersBar = () => {
  const filters = ["בריאות", "חינוך", "קהילה", "מזון", "חיות", "מחסה"];

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center rounded-lg">
      {filters.map((filter) => (
        <Link key={filter} to={`/projects?category=${filter}`}>
          <Button className="hover:bg-primary/70">{filter}</Button>
        </Link>
      ))}
    </div>
  );
};

export default FiltersBar;
