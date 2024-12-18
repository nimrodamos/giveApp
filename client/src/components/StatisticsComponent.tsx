import { useEffect, useState } from "react";

// קומפוננטה לאנימציה של כותרת – מילה אחר מילה
const AnimatedTitle = ({ text }: { text: string }) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    // פיצול הטקסט למילים ושמירה על רווחים
    const words = text.trim().split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      setVisibleWords((prev) => [...prev, words[currentIndex]]);
      currentIndex++;
      if (currentIndex === words.length) clearInterval(interval);
    }, 300); // השהיה בין כל מילה

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary leading-relaxed">
      {visibleWords.map((word, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-fadeIn transform transition-transform"
          style={{
            animationDelay: `${index * 300}ms`, // דיליי לכל מילה
            animationDuration: "0.5s",
          }}
        >
          {word}&nbsp; {/* שמירה על רווחים בין המילים */}
        </span>
      ))}
    </h1>
  );
};

// קומפוננטה לאנימציה של מספרים
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;

    const increment = Math.max(1, Math.floor(value / 100)); // קצב ההתקדמות: לפחות 1, עד 100 צעדים

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value); // עצירה על המספר המדויק
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / (value / increment)); // קצב הדינמי לפי כמות השלבים

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold text-primary">
      {count.toLocaleString()}
    </span>
  );
};

// קומפוננטת הסטטיסטיקות הראשית
const StatisticsComponent = () => {
  const stats = [
    { title: "סך הפרויקטים", value: 8 },
    { title: "סך התרומות", value: 2650 },
    { title: "סך פעולות התרומה", value: 6 },
  ];

  return (
    <div className="p-8 bg-background rounded-lg shadow-2xl space-y-8">
      {/* הכותרת עם האנימציה */}
      <AnimatedTitle text=" בואו תצטרפו גם אתם לסטטיסטיקה " />

      {/* הסטטיסטיקות */}
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

export default StatisticsComponent;
