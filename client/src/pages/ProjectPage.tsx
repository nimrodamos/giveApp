import { useLocation } from "react-router-dom";
import { FiFacebook, FiMail, FiTwitter } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const ProjectPage = () => {
  const location = useLocation();
  const { project } = location.state || {};
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!project)
    return <div className="p-6 text-center text-lg font-semibold">טוען...</div>;

  return (
    <div className="p-6 container mx-auto space-y-8">
      <div className="bg-background p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8">
        {/* צד שמאל - מידע על הפרויקט */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">
            {project.title}
          </h1>
          <div className="flex items-center gap-3">
            <img
              src={project.creatorImage || "https://via.placeholder.com/50"}
              alt="creator"
              className="w-12 h-12 rounded-full object-cover shadow"
            />
            <div>
              <p className="text-muted-foreground">הפרויקט של</p>
              <p className="font-semibold">{project.creatorName}</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{project.description}</p>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span>₪{project.current_amount}</span>
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

          {/* כפתור תרומה */}
          <Button
            onClick={scrollToForm}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md shadow-md hover:bg-ring transition duration-300 font-semibold hover:scale-105"
          >
            לתרומה
          </Button>

          {/* כפתורי שיתוף */}
          <div className="flex gap-4 items-center justify-center mt-4">
            <a
              href="#"
              className="text-blue-500 text-3xl transition-transform hover:scale-125"
            >
              <FiMail />
            </a>
            <a
              href="#"
              className="text-green-500 text-3xl transition-transform hover:scale-125"
            >
              <FiTwitter />
            </a>
            <a
              href="#"
              className="text-blue-600 text-3xl transition-transform hover:scale-125"
            >
              <FiFacebook />
            </a>
          </div>
        </div>

        {/* צד ימין - תמונה גדולה */}
        <div className="w-full lg:w-1/2">
          <img
            src={project.image || "https://via.placeholder.com/600x400"}
            alt={project.title}
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      {/* בחירת סכום לתרומה */}
      <div className="bg-background p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4 text-primary">
          בחרו סכום לתרומה
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {["₪25", "₪50", "₪100", "₪150", "₪200", "₪500", "₪1000", "₪5000"].map(
            (amount, index) => (
              <div
                key={index}
                className="border-2 border-border rounded-full flex items-center justify-center p-3 hover:border-primary cursor-pointer transition"
              >
                <span className="font-semibold text-primary">{amount}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* טופס התרומה */}
      <div
        ref={formRef}
        className="bg-background p-6 rounded-lg shadow-lg space-y-4 border"
      >
        <h3 className="text-xl font-bold text-primary text-center mb-4">
          מלאו את פרטי התרומה
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 text-muted-foreground">
              שם מלא
            </label>
            <input
              type="text"
              placeholder="הכניסו את שמכם"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-muted-foreground">
              אימייל
            </label>
            <input
              type="email"
              placeholder="הכניסו את כתובת האימייל"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-muted-foreground">
              סכום התרומה
            </label>
            <input
              type="number"
              placeholder="הזינו סכום"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
          >
            המשך
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectPage;
