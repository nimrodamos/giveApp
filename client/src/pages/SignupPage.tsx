import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { api } from "@/api";
import { useUser } from "@/components/context/userContext";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { email, password } = formData;
      const res = await api.post(
        "users/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast({
        title: "Success",
        description: "User registered successfully, welcome !",
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failure",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex text-black items-center justify-center h-screen  p-6">
      <div className="bg-card rounded-2xl shadow-lg border border-border flex overflow-hidden">
        {/* Left Section with Smaller Image */}
        <div className="w-1/2 flex items-center justify-center p-4 bg-primary">
          <img
            src="../../Media/Screenshot_2024-12-19_001546-removebg-preview.png"
            alt="Logo"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Section with Form */}
        <div className="w-1/2 bg-primary flex items-center justify-center p-6">
          <div className="bg-card rounded-2xl p-8 shadow-lg w-[500px] space-y-6">
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
                <label className="block text-foreground font-medium">
                  Email
                </label>
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
                src="../../Media/Google1.png"
                alt="Google"
                className="w-72 mb-3 cursor-pointer block"
              />
              <img
                src="../../Media/Apple1.png"
                alt="Apple"
                className="w-72 mb-3 cursor-pointer block"
              />
              <img
                src="../../Media/Facebook1.png"
                alt="Facebook"
                className="w-72 cursor-pointer block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
