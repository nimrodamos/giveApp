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
    <div className="relative p-6 bg-gray-100 rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* כותרת הקרוסלה */}
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        ✨ פרויקטים נבחרים ✨
      </h2>

      {/* הקרוסלה */}
      <Carousel>
        <CarouselContent className="flex">
          {projects.map((project) => (
            <CarouselItem
              key={project._id}
              className="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
            >
              {/* כרטיס הפרויקט */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardProject project={project} />
              </div>
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
