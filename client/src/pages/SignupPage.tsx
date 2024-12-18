import { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "", // Change to match the schema field name
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      alert("User registered successfully!");
      console.log(response.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Full-Screen Logo */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img
          src="../../Media/Logo.jpeg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section with Background Color */}
      <div className="w-1/2 bg-[#DED5FF] flex items-center justify-center">
        {/* Form Container */}
        <div className="bg-[#EEE8FF] rounded-2xl p-12 shadow-lg w-[500px] space-y-6">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-600 font-medium">Username</label>
              <input
                type="text"
                name="username" // Match the schema
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Social Login (Only Images) */}
          <div className="flex items-center flex-col gap-0">
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
