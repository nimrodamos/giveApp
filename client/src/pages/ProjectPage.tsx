import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// מבנה של Project
interface Project {
  _id: string;
  title: string;
  description: string;
  goal: number;
  current_amount: number;
  status: string;
  details: {
    images: string[];
    text: string;
  };
}

const ProjectPage = () => {
  const { id } = useParams(); // קבלת ה-id מה-URL
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // דאטה דמיוני המדמה משיכה מה-Backend
    const fetchProject = () => {
      const dummyProject: Project = {
        _id: id || "12345",
        title: "Build a Community School",
        description: "Help us build a school for underprivileged children.",
        goal: 10000,
        current_amount: 4500,
        status: "active",
        details: {
          images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
          ],
          text: "This project is aimed to provide quality education to children in rural areas.",
        },
      };

      setProject(dummyProject);
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* כותרת */}
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-4">{project.description}</p>

      {/* סכומים וסטטוס */}
      <div className="mb-4">
        <p>
          <strong>Goal:</strong> ${project.goal}
        </p>
        <p>
          <strong>Current Amount:</strong> ${project.current_amount}
        </p>
        <p>
          <strong>Status:</strong> {project.status}
        </p>
      </div>

      {/* פרטים מורחבים */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Details</h2>
        <p className="mb-4">{project.details.text}</p>
        <div className="flex gap-4">
          {project.details.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project ${index}`}
              className="w-1/4 rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
