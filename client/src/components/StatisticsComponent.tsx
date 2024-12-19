import { useEffect, useState } from "react";
import { api } from "@/api";

const Stats = () => {
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

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-[hsl(var(--foreground))]">
        בואו תצטרפו גם אתם לסטטיסטיקה
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Projects */}
        <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            סך הפרויקטים
          </h2>
          <p className="text-4xl font-semibold text-primary mt-2">
            {totalProjects !== null ? totalProjects : "0"}
          </p>
        </div>

        {/* Total Donations Amount */}
        <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            סך התרומות
          </h2>
          <p className="text-4xl font-semibold text-primary mt-2">
            {totalDonations !== null ? `₪${totalDonations}` : "0"}
          </p>
        </div>

        {/* Total Donation Events */}
        <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            סך פעולות התרומה
          </h2>
          <p className="text-4xl font-semibold text-primary mt-2">
            {totalDonationEvents !== null ? totalDonationEvents : "0"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Stats;
