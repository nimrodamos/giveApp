import { useState, FormEvent } from "react";
import { api } from "@/api";

const CreateProjectPage = () => {
  // State to store the form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const res = await api.post("projects", formData);
    console.log(res.data);
    // Example of how you could send this data to an API
    // await api.post('/projects', formData);
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-4">צור פרוייקט חדש</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="מה שם הפרויקט?"
          className="p-2 border rounded"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="מה הפרוייקט מכיל?"
          className="p-2 border rounded"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          placeholder="מה הסכום הרצוי?"
          className="p-2 border rounded"
          name="goal"
          value={formData.goal}
          onChange={handleInputChange}
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          צור פרוייקט
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
