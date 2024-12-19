import React, { useEffect, useState } from "react";
import { useUser } from "@/components/context/userContext";
import { api } from "@/api";
import { Link } from "react-router-dom"; // Import Link for navigation

const UserProfile: React.FC = () => {
  const { user, isLoggedIn, isLoading } = useUser();
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user-specific projects and donations
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, donationsRes] = await Promise.all([
        api.get("/projects/user/", { withCredentials: true }), // Fetch user projects
        api.get(`/donations/user/${user?._id}`, { withCredentials: true }), // Fetch user donations
      ]);

      console.log("Projects API Response:", projectsRes.data);
      console.log("Donations API Response:", donationsRes.data);

      setProjects(projectsRes.data.projects || []);
      setDonations(donationsRes.data || []); // Ensure donationsRes.data is properly set
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Donations state updated:", donations);
  }, [donations]);

  if (isLoading || loading) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  if (!isLoggedIn || !user) {
    return <div className="text-center p-6">Please log in to view your profile.</div>;
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto bg-card shadow-lg rounded-lg space-y-6">
      {/* User Info Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">ברוכה הבאה, {user.username}</h1>
        <p className="text-muted-foreground">Email: {user.email}</p>
      </div>
  
      {/* User Projects Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">הפרויקטים שלך</h2>
        {projects.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project) => (
              <li
                key={project._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <Link to={`/projects/${project._id}`}>
                  <img
                    src={project.image || "https://via.placeholder.com/150"}
                    alt={project.title || "Project Image"}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <p className="mt-2 text-sm text-primary">
                    יעד: ₪{project.goal} | גויס: ₪{project.current_amount}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No projects created yet.</p>
        )}
      </div>
  
      {/* User Donations Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">התרומות שלך</h2>
        {Array.isArray(donations) && donations.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {donations.slice(0, 4).map((donation) => (
              <li
                key={donation._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <Link to={`/projects/${donation.project_id?._id}`}>
                  <img
                    src={donation.project_id?.image || "https://via.placeholder.com/150"}
                    alt={donation.project_id?.title || "Project Image"}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p>
                    אתה תרמת{" "}
                    <span className="font-semibold text-primary">₪{donation.amount}</span> ל{" "}
                    <span className="font-medium">{donation.project_id?.title || "Unknown Project"}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    בתאריך:{" "}
                    {donation.createdAt
                      ? new Date(donation.createdAt).toLocaleDateString()
                      : "Unknown Date"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No donations made yet.</p>
        )}
      </div>
    </div>
  );
  
};

export default UserProfile;
