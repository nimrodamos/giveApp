import { Button } from "@/components/ui/button";

const InfoPage: React.FC = () => {
  return (
    <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen p-6">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="text-4xl text-primary font-bold mb-2">
          התחלת פרויקט המימון שלך
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))]">
          כל מה שאתם צריך כדי להצליח פרויקט מצליח ובעלים.
        </p>
      </header>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step 1: Title and Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            שלב 1: כותרת הפרויקט ותיאור
          </h2>
          <p>
            בחרו כותרת משכת שמשקפת את המטרת שלכם. בתיאור, הסבירו פרטים על
            הפרויקט, מיהו מתוכן ולמה הוא חשוב.
          </p>
        </section>

        {/* Step 2: Define Your Goal */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">שלב 2: הגדרת המטרה</h2>
          <p>
            הגדרתכם צריכה וראלית. חשבו על הסכום הימועטי שאתם צריכים לשגות את
            ההשפעה.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>הגדירו מטרה מודרת (למשל: 18,000 שקל לבניית מקלט מקומי).</li>
            <li>הסבירו מה המטרה שלכם.</li>
            <li>היו שקיפים על השימוש בכספים הכספיים.</li>
          </ul>
        </section>

        {/* Step 3: Realistic Timeframe */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            שלב 3: הגדרת לוח זמן ראלי
          </h2>
          <p>
            תכננו כמה זמן יקח להשיג את המטרה. רוב הפרויקטים המצליחים נמשכים בין
            30 ל-60 יומים.
          </p>
        </section>

        {/* Step 4: Upload Visuals */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            שלב 4: העלאת תמונות וידיאו
          </h2>
          <p>
            סרטוני וידיאו עוזרים לעלות עניין למטרה שלכם. העלו תמונות שמציגות את
            המטרת ולקהל היעד שהוא נחשף אליו.
          </p>
        </section>

        {/* Step 5: Your Story */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            שלב 5: ספרו את הסיפור שלכם
          </h2>
          <p>
            אנשים מתחברים לסיפור האישי שלכם , תעלו כמה שיותר פרטים שיחברו אנשים
            אחרים למטרה שלכם על מנת להגביר חשיפה
          </p>
        </section>
        <Button>
          {" "}
          <a href="/create">להתחלת פרוייקט</a>{" "}
        </Button>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-12 text-sm text-[hsl(var(--muted-foreground))]">
        <p>© {new Date().getFullYear()} GiveAPP - לתת באהבה</p>
      </footer>
    </div>
  );
};

export default InfoPage;
