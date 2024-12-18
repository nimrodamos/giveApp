import { useLocation } from "react-router-dom";
import CardProject from "@/components/CardProject";

const ProjectPage = () => {
  const location = useLocation();
  const { project } = location.state || {};
  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* כותרת */}
      <CardProject project={project} />
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-4">{project.description}</p>

      {/* סכומים וסטטוס */}
      <div className="mb-4">
        <p>
          <strong>סכום:</strong> ${project.current_amount}
        </p>
        <p>
          <strong>יעד:</strong> ${project.goal}
        </p>
      </div>

      {/* פרטים מורחבים */}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default ProjectPage;
