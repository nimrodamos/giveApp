
import { useEffect, useState } from "react";
import { api } from "@/api";

// Animated Title Component
const AnimatedTitle = ({ text }: { text: string }) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    const words = text.trim().split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      setVisibleWords((prev) => [...prev, words[currentIndex]]);
      currentIndex++;
      if (currentIndex === words.length) clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary leading-relaxed">
      {visibleWords.map((word, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-fadeIn transform transition-transform"
          style={{
            animationDelay: `${index * 300}ms`,
            animationDuration: "0.5s",
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </h1>
  );
};

// Animated Number Component
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.max(1, Math.floor(value / 100));

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / (value / increment));

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-primary">
      {count.toLocaleString()}
    </span>
  );
};

// Main Component
const DynamicStatisticsComponent = () => {
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [totalDonations, setTotalDonations] = useState<number | null>(null);
  const [totalDonationEvents, setTotalDonationEvents] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await api.get("/analytics/stats");
        setTotalProjects(res.data.totalProjects || 0);
        setTotalDonations(res.data.totalDonations || 0);
        setTotalDonationEvents(res.data.totalUniqueDonors || 0);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading stats...</div>;
  }

  const stats = [
    { title: "סך הפרויקטים", value: totalProjects || 0 },
    { title: "סך התרומות", value: totalDonations || 0 },
    { title: "סך פעולות התרומה", value: totalDonationEvents || 0 },
  ];

  return (
    <div className="p-8 bg-background rounded-lg shadow-2xl space-y-8">
      {/* Animated Title */}
      <AnimatedTitle text="בואו תצטרפו גם אתם לסטטיסטיקה" />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-card rounded-lg shadow-lg border border-border transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-muted-foreground mb-2">
              {stat.title}
            </h2>
            <AnimatedNumber value={stat.value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicStatisticsComponent;
