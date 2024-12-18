import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Modal from "react-modal";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // פתיחה וסגירה של המודל
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* לוגו */}
        <div className="text-2xl font-bold">GiveApp</div>

        {/* תפריט */}
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/projects" className="hover:text-gray-400">
              Projects
            </a>
          </li>
          <li>
            <a href="/create" className="hover:text-gray-400">
              Create Project
            </a>
          </li>

          {/* כפתור Login עם Popover */}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"secondary"} onClick={openModal} className="">
                  Login
                </Button>
              </PopoverTrigger>
            </Popover>
          </li>
        </ul>
      </div>

      {/* מודל Login */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0"
        ariaHideApp={false} // חשוב למנוע אזהרות ב-React
      >
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <button
            onClick={closeModal}
            className="mt-4 text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
