
// export default CreateProjectPage;
import { useState, FormEvent } from "react";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CreateProjectPage = () => {
  const {toast} = useToast()
  // State to store the form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    end_date: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const res = await api.post("projects", formData , {withCredentials: true});
    console.log(res.data);
    // Example of how you could send this data to an API
    // await api.post('/projects', formData);
  };

  // List of available categories
  const categories = [
    "חינוך",
    "בריאות",
    "פיתוח קהילתי",
    "סביבה",
    "אמנות ותרבות",
    "רווחת בעלי חיים",
    "סיוע חירום",
    "אחר",
  ];

  return (
    <div className="flex flex-row-reverse justify-center items-start p-6 space-x-6 space-x-reverse">
      <div className="w-2/5">
        <img 
          className="w-full rounded-full object-cover h-full"
          src="../../Media/charitiessss.jpg" 
          alt="" 
        />
      </div>
      <div className="w-3/5 bg-card rounded-2xl p-12 shadow-lg space-y-6 mt-6 border border-[hsl(var(--border))] bg-opacity-90 h-auto py-16 pr-6">
        <h1 className="text-3xl font-bold mb-4">צור פרוייקט חדש</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          <p>קטגוריה*</p>
          <select
            className="p-2 border rounded"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              איזה קטגוריה תואמת לפרוייקט שלך
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p>שם הפרוייקט</p>
          <input
            type="text"
            placeholder="מה שם הפרויקט?"
            className="p-2 border rounded"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <p>תיאור הפרוייקט</p>
          <textarea
            placeholder="מה הפרוייקט מכיל?"
            className="p-2 border rounded"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <p>יעד לפרוייקט</p>
          <input
            min={0}
            type="number"
            placeholder="מה הסכום הרצוי?"
            className="p-2 border rounded"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          />
          <p>ימים נותרו**</p>
          <input
            min={new Date().toISOString().split("T")[0]}
            max={(() => {
              const maxDate = new Date();
              maxDate.setMonth(maxDate.getMonth() + 2); 
              return maxDate.toISOString().split("T")[0];
            })()}
            type="date"
            placeholder="תאריך סיום ליעד "
            className="p-2 border rounded"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />
          <Button className="bg-primary p-2 rounded">
            צור פרוייקט
          </Button>
          <p>*- אופציינאלי <br></br> **-עד 60 ימים</p>
        </form>
      </div>
    </div>
  );
}
export default CreateProjectPage;