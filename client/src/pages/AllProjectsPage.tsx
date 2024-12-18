import { Link } from "react-router-dom";
import CardProject from "@/components/CardProject";

// מבנה של Project
interface Project {
  _id: string;
  title: string;
  description: string;
}

const AllProjectsPage = () => {
  // דאטה דמיוני המדמה רשימת פרויקטים מה-Backend
  const projects: Project[] = [
    {
      _id: "12345",
      title: "Build a Community School",
      description: "Providing education for underprivileged children.",
    },
    {
      _id: "67890",
      title: "Clean Water Initiative",
      description: "Bringing clean water to remote villages.",
    },
    {
      _id: "54321",
      title: "Plant a Million Trees",
      description: "Reforestation for a greener future.",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">All Projects</h1>
      <CardProject />
    </div>
  );
};

export default AllProjectsPage;
