import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData
      );
      alert("User registered successfully!");
      console.log(response.data);
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex">
      {/* Left Section with Full-Screen Logo */}
      <div className="w-1/2 bg-background flex items-center justify-center">
        <img
          src="../../Media/Logo.jpeg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-secondary flex items-center justify-center">
        <div className="bg-card rounded-2xl p-12 shadow-lg w-[500px] space-y-6">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-foreground font-medium">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-foreground font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-foreground font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-ring text-primary-foreground py-3 rounded-md transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Social Login (Only Images) */}
          <div className="flex items-center flex-col gap-2">
            <img
              src="../../Media/Google.png"
              alt="Google"
              className="cursor-pointer block"
            />
            <img
              src="../../Media/Apple.png"
              alt="Apple"
              className="cursor-pointer block"
            />
            <img
              src="../../Media/Facebook.png"
              alt="Facebook"
              className="cursor-pointer block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
