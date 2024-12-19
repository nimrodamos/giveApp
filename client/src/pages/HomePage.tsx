import CarouselProject from "@/components/CarouselProject";
import EndingSoonCarousel from "@/components/EndingSoonCarousel";
import StatisticsComponent from "@/components/StatisticsComponent";

const HomePage = () => {
  return (
    <div>
      <StatisticsComponent />
      <CarouselProject />
      <EndingSoonCarousel />
    </div>
  );
};

export default HomePage;
