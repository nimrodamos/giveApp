import { Link } from "react-router-dom";
import CardProject from "@/components/CardProject";
import { useEffect } from "react";

// מבנה של Project
interface Project {
  _id: string;
  title: string;
  description: string;
}

const AllProjectsPage = () => {
  useEffect(() => {
    const fetchProjects = async () => {};
  });

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">All Projects</h1>
      <CardProject />
    </div>
  );
};

export default AllProjectsPage;
