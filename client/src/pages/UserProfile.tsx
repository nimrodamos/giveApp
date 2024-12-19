import React, { useEffect, useState } from "react";
import { useUser } from "@/components/context/userContext";
import { api } from "@/api";
import { log } from "console";

interface Project {
  _id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
}

interface Donation {
  _id: string;
  amount: number;
  projectTitle: string;
  date: string;
}

const UserProfile: React.FC = () => {
  const { user, isLoggedIn, isLoading } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Fetch user-specific projects and donations
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    setLoading(true);
    try { console.log(user);
    
      const [projectsRes, donationsRes] = await Promise.all([
        api.get("/projects/user", { withCredentials: true }), // Fetch user projects
        api.get(`/donations/user/${user?._id}`, { withCredentials: true }), // Fetch user donations
      ]);
      console.log(projectsRes);
      console.log(donationsRes);
      
      
      setProjects(projectsRes.data.projects || []);
      setDonations(donationsRes.data.donations || []);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome, {user.username}</h1>
        <p className="text-muted-foreground">Email: {user.email}</p>
      </div>

      {/* User Projects Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Projects</h2>
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                <p className="mt-2 text-sm text-primary">
                  Goal: ${project.goal} | Raised: ${project.raised}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No projects created yet.</p>
        )}
      </div>

      {/* User Donations Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Donations</h2>
        {donations.length > 0 ? (
          <ul className="space-y-4">
            {donations.map((donation) => (
              <li
                key={donation._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <p>
                  You donated{" "}
                  <span className="font-semibold text-primary">${donation.amount}</span> to{" "}
                  <span className="font-medium">{donation.projectTitle}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(donation.date).toLocaleDateString()}
                </p>
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
