import { useEffect } from "react";
import { useProject } from "./context/projectContext";
import CardProject from "@/components/CardProject";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const EndingSoonCarousel = () => {
  const { projects, fetchProjects } = useProject();

  useEffect(() => {
    // Fetch projects on mount
    const fetchData = async () => {
      try {
        await fetchProjects();
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchData();
  }, [fetchProjects]);

  // Filter projects that are in their last week
  const endingSoonProjects = projects.filter((project) => {
    const today = new Date();
    const end_date = new Date(project.end_date);
    const timeDifference = end_date.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft <= 7 && daysLeft >= 0; // Projects ending in the next 7 days
  });

  return (
    <div className="relative p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* Carousel Title */}
      <h2 className="text-xl font-bold text-right mb-2 text-primary">
        🕒 פרויקטים שקרובים לסיום 🕒
      </h2>

      {/* Carousel */}
      <Carousel opts={{ direction: "rtl", loop: true }}>
        <CarouselContent>
          {endingSoonProjects.map((project) => (
            <CarouselItem
              key={project._id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Link to={`/projects/${project._id}`} state={{ project }}>
                {/* Project Card */}
                <div className="shadow-md rounded-lg">
                  <CardProject project={project} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-opacity-80 transition" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2 hover:bg-opacity-80 transition" />
      </Carousel>
    </div>
  );
};

export default EndingSoonCarousel;
