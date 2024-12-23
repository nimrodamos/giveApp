import React, { useEffect, useState } from "react";
import { useUser } from "@/components/context/userContext";
import { api } from "@/api";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Project } from "@/types/projectTypes";
import { Donation } from "@/types/donationTypes";

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
    try {
      const [projectsRes, donationsRes] = await Promise.all([
        api.get("/projects/user/", { withCredentials: true }), // Fetch user projects
        api.get(`/donations/user/${user?._id}`, { withCredentials: true }), // Fetch user donations
      ]);

      console.log("Projects API Response:", projectsRes.data);
      console.log("Donations API Response:", donationsRes.data);

      setProjects(projectsRes.data.projects || []);
      setDonations(donationsRes.data || []);
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
    return (
      <div className="text-center p-6">Please log in to view your profile.</div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-card shadow-lg rounded-lg space-y-6">
      {/* User Info Section */}
      <div className="flex justify-between items-start w-full max-w-6xl mx-auto space-x-4">
        {/* Profile Card */}
        <div className="w-[290px] h-[410px] bg-background border rounded-md shadow-sm hover:shadow-md overflow-hidden text-right rtl">
          {/* Background Image */}
          <div className="relative h-24 w-full bg-cover bg-center">
            <img
              src="../../Media/background.png"
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Profile Picture */}
            <img
              src={user.profilePic || "../../Media/profilePic.jpeg"}
              alt="Profile"
              className="absolute bottom-[-48px] right-4 w-24 h-24 rounded-full border-4 border-card object-cover shadow-md"
            />
          </div>

          {/* Content Section */}
          <div className="p-3 pt-14">
            {/* Full Name */}
            <h2 className="text-2xl font-bold text-foreground mb-3">
              {user.username}
            </h2>

            {/* Role/Title */}
            <p className="text-base text-muted-foreground mb-2">
              {user.role || "No role specified"}
            </p>

            {/* Address */}
            <p className="text-sm text-muted-foreground mb-4">
              {user.city || "No address specified"}
            </p>

            {/* Small Images Row */}
            <div className="flex justify-between items-center space-x-2 pt-10">
              <img
                src="../../Media/5296503_inspiration_pin_pinned_pinterest_social network_icon.png"
                alt="Small Image 1"
                className="w-12 h-12 rounded-full border border-card object-cover"
              />
              <img
                src="../../Media/5296501_linkedin_network_linkedin logo_icon.png"
                alt="Small Image 2"
                className="w-12 h-12 rounded-full border border-card object-cover"
              />
              <img
                src="../../Media/5296499_fb_facebook_facebook logo_icon.png"
                alt="Small Image 3"
                className="w-12 h-12 rounded-full border border-card object-cover"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="flex-1 bg-background border rounded-md shadow-sm hover:shadow-md p-6 text-right rtl h-[410px] pr-4">
          <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
          <p className="text-sm text-muted-foreground">
            {user.about || "No about section provided."}
          </p>
        </div>
      </div>

      {/* User Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">
          ברוך הבא, {user.username}
        </h1>
        <p className="text-muted-foreground">Email: {user.email}</p>
      </div>

      {/* User Projects Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          הפרויקטים שלך
        </h2>
        {projects.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project) => (
              <li
                key={project._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <Link
                  to={`/projects/${project._id}`}
                  state={{ project }}
                  key={project._id}
                >
                  <img
                    src={project.image || "https://via.placeholder.com/150"}
                    alt={project.title || "Project Image"}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="text-xl font-medium">{project.title}</h3>

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
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          התרומות שלך
        </h2>
        {Array.isArray(donations) && donations.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {donations.slice(0, 4).map((donation) => (
              <li
                key={donation._id}
                className="p-4 border rounded-md shadow-sm bg-background hover:shadow-md"
              >
                <Link to={`/projects/${donation.project_id}`}>
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt={"Project Image"}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <p>
                    אתה תרמת{" "}
                    <span className="font-semibold text-primary">
                      ₪{donation.amount}
                    </span>{" "}
                    ל <span className="font-medium">{"Unknown Project"}</span>
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
