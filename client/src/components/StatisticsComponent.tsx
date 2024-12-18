import { useEffect, useState } from "react";
import axios from "axios";

const Stats = () => {
  const [totalProjects, setTotalProjects] = useState<number | null>(null);
  const [totalDonations, setTotalDonations] = useState<number | null>(null);
  const [totalDonators, setTotalDonators] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all stats
        const [usersRes, donationsRes] = await Promise.all([
          axios.get("/total-users"), // Correct path for total users
          axios.get("/total-donations"), // Correct path for total donations
        ]);

        // Set the states
        setTotalProjects(usersRes.data.total || 0);
        setTotalDonations(donationsRes.data.total || 0);
        setTotalDonators(usersRes.data.total || 0); // Assuming users are donators
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-card rounded-lg shadow-lg">
      {/* Total Projects */}
      <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          סך המשתמשים
        </h2>
        <p className="text-4xl font-semibold text-primary mt-2">
          {totalProjects !== null ? totalProjects : "0"}
        </p>
      </div>

      {/* Total Donations */}
      <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          סך התרומות
        </h2>
        <p className="text-4xl font-semibold text-primary mt-2">
          {totalDonations !== null ? `$${totalDonations}` : "0"}
        </p>
      </div>

      {/* Total Donators */}
      <div className="flex flex-col items-center p-4 border rounded bg-[hsl(var(--muted))]">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
          סך התורמים
        </h2>
        <p className="text-4xl font-semibold text-primary mt-2">
          {totalDonators !== null ? totalDonators : "0"}
        </p>
      </div>
    </div>
  );
};

export default Stats;
