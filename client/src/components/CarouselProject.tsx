import { useEffect, useState } from "react";
import { api } from "@/api";
import { Project } from "@/types/projectTypes";
import CardProject from "@/components/CardProject";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const CarouselProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("projects", { withCredentials: true });
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative p-6  rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* כותרת הקרוסלה */}
      <h2 className="text-xl font-bold text-right mb-2 text-primary">
        ✨ פרויקטים נבחרים ✨
      </h2>

      {/* הקרוסלה */}
      <Carousel
        opts={{
          direction: "rtl",
          loop: true,
        }}
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem
              key={project._id}
              className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
            >
              <Link
                to={`/projects/${project._id}`}
                state={{ project }}
                key={project._id}
              >
                {/* כרטיס הפרויקט */}
                <div className="shadow-md rounded-lg">
                  <CardProject project={project} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* כפתורי ניווט */}
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-opacity-80 transition" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-opacity-80 transition" />
      </Carousel>
    </div>
  );
};

export default CarouselProject;
