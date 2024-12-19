import CarouselProject from "@/components/CarouselProject";
import EndingSoonCarousel from "@/components/EndingSoonCarousel";
import FiltersBar from "@/components/FiltersBar";
import PopularProjectsCarousel from "@/components/PopularProjectsCarousel";
import StatisticsComponent from "@/components/StatisticsComponent";
const HomePage = () => {
  return (
    <div>
      <FiltersBar />
      <StatisticsComponent />
      <PopularProjectsCarousel />
      <CarouselProject />
      <EndingSoonCarousel />
    </div>
  );
};

export default HomePage;
