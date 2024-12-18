import { Link } from "react-router-dom";

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
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="border-b pb-4">
            <Link
              to={`/projects/${project._id}`}
              className="text-2xl text-blue-600 hover:underline"
            >
              {project.title}
            </Link>
            <p className="text-gray-600">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProjectsPage;
