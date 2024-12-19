import Modal from "react-modal";
import { LoginModalProps } from "@/types/loginTypes";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/userContext";

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("users/login", formData, {
        withCredentials: true,
      });

      if (!response.data) {
        console.log("Error logging in");
        return;
      }
      setUser(response.data.user);

      navigate("/");
      setFormData({ email: "", password: "" });
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="bg-card p-6 rounded-lg shadow-lg w-96 text-card-foreground text-center motion-preset-expand"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
      ariaHideApp={false}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Login</h2>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleOnChange}
            className="w-full p-2 border rounded bg-input text-foreground placeholder-muted-foreground"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleOnChange}
            className="w-full p-2 border rounded bg-input text-foreground placeholder-muted-foreground"
            required
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded w-full hover:bg-ring hover:bg-primary/80"
          >
            Login
          </button>
        </form>
        <p className="mt-3">
          להרשמות לחץ{" "}
          <a href="/signup" className="text-primary hover:text-primary/70">
            כאן
          </a>
        </p>
        <br />
        <button onClick={onClose} className="mt-1 text-destructive">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
