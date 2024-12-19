import { useState } from "react";
import { useUser } from "@/components/context/userContext";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    about: user?.about || "",
    city: user?.city || "",
    role: user?.role || "",
    profilePic: user?.profilePic || "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${user?._id}`, formData, {
        withCredentials: true,
      });
      setUser(response.data); // Update user context with new data
      navigate("/profile");
      toast({
        title: "Success",
        description: "Settings updated successfully!",
      });
    } catch (err) {
      console.error("Failed to update settings:", err);
      toast({
        title: "Failure",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-card shadow-lg rounded-lg space-y-6 text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">הגדרות משתמש</h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-border rounded-lg shadow-md mx-auto text-black">
        {/* Username */}
        <div>
          <label className="block text-foreground font-medium">שם משתמש</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-foreground font-medium">אימייל</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-foreground font-medium">סיסמא</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-foreground font-medium">אודות</label>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-foreground font-medium">כתובת</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-foreground font-medium">תפקיד</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-3/4 mt-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring mx-auto"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-foreground font-medium">תמונת פרופיל</label>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={formData.profilePic || "https://via.placeholder.com/150"}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover mx-auto"
            />
            <Button
              type="button"
              onClick={() => alert("Upload functionality not implemented")}
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md w-1/2 mx-auto"
            >
              להעלאת תמונה חדשה
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground py-2 px-4 rounded-md w-1/2 mx-auto"
          >
            שמור שינויים
          </Button>
        </div>
      </form>
    </div>
  );

};

export default Settings;
