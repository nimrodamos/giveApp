import { Link } from "react-router-dom";
import CardProject from "@/components/CardProject";
import { useEffect } from "react";
import { api } from "@/api";
import { useState } from "react";
import { Project } from "@/types/projectTypes";

const AllProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get("projects", { withCredentials: true });
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">פרוייקטים</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rtl:*">
        {projects.map((project) => {
          return (
            <Link to={`${project._id}`} state={{ project }} key={project._id}>
              <CardProject project={project} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProjectsPage;
