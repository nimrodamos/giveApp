import { Button } from "@/components/ui/button";
import { FiFacebook, FiMail, FiTwitter } from "react-icons/fi";
import { Project } from "@/types/projectTypes";

interface ProjectDetailsProps {
  project: Project;
  onDonateClick: () => void;
}

const ProjectDetails = ({ project, onDonateClick }: ProjectDetailsProps) => (
  <div className="bg-background p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8">
    <div className="space-y-6 w-full lg:w-1/2">
      <h1 className="text-4xl font-extrabold text-primary">{project.title}</h1>
      <p className="text-lg text-muted-foreground">{project.description}</p>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm font-semibold mb-1">
          <span>{project.current_amount}₪</span>

          <span>
            {Math.round((project.current_amount / project.goal) * 100)}%
          </span>
        </div>
        <div className="relative w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full"
            style={{
              width: `${(project.current_amount / project.goal) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <span>{`יעד: ${project.goal}₪`}</span>
      {/* End Date */}
      <p className="text-sm text-muted-foreground">
        תאריך יעד: {new Date(project.endDate).toLocaleDateString("he-IL")}
      </p>

      {/* כפתור תרומה */}
      <Button
        onClick={onDonateClick}
        className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-ring transition duration-300 font-semibold hover:scale-105"
      >
        לתרומה
      </Button>

      {/* כפתורי שיתוף */}
      <div className="flex gap-4 items-center justify-center">
        <FiMail className="text-blue-500 text-3xl hover:scale-125 transition" />
        <FiTwitter className="text-green-500 text-3xl hover:scale-125 transition" />
        <FiFacebook className="text-blue-600 text-3xl hover:scale-125 transition" />
      </div>
    </div>
    {/* צד ימין - תמונה */}
    <div className="w-full lg:w-1/2">
      <img
        src={project.image || "https://via.placeholder.com/600x400"}
        alt={project.title}
        className="w-full rounded-lg shadow-lg object-cover"
      />
    </div>
  </div>
);

export default ProjectDetails;
