import { useState, FormEvent } from "react";
import { api } from "@/api";
import { Button } from "@/components/ui/button";

const CreateProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    end_date: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    const res = await api.post("projects", formData);
    console.log(res.data);
  };

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
      {/* תמונה */}
      <div className="w-2/5">
        <img
          className="w-full rounded-full object-cover h-full"
          src="../../Media/charitiessss.jpg"
          alt="צור פרויקט חדש"
        />
      </div>
      {/* טופס */}
      <div className="w-3/5 bg-card rounded-2xl p-12 shadow-lg space-y-6 mt-6 border border-border bg-opacity-90 h-auto py-16 pr-6">
        <h1 className="text-3xl text-primary font-bold mb-4">
          צור פרוייקט חדש
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          <p className="text-foreground">קטגוריה*</p>
          <select
            className="p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
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

          <p className="text-foreground">שם הפרוייקט</p>
          <input
            type="text"
            placeholder="מה שם הפרויקט?"
            className="p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <p className="text-foreground">תיאור הפרוייקט</p>
          <textarea
            placeholder="מה הפרוייקט מכיל?"
            className="p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <p className="text-foreground">יעד לפרוייקט</p>
          <input
            min={0}
            type="number"
            placeholder="מה הסכום הרצוי?"
            className="p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          />

          <p className="text-foreground">ימים נותרו**</p>
          <input
            min={new Date().toISOString().split("T")[0]}
            max={(() => {
              const maxDate = new Date();
              maxDate.setMonth(maxDate.getMonth() + 2);
              return maxDate.toISOString().split("T")[0];
            })()}
            type="date"
            placeholder="תאריך סיום ליעד "
            className="p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />

          <Button className="bg-primary p-2 rounded text-primary-foreground hover:bg-primary/90 transition">
            צור פרוייקט
          </Button>
          <p className="text-foreground">
            *- אופציינאלי <br /> **- עד 60 ימים
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
