import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/context/userContext";

interface DonationFormProps {
  onSuccess: () => void; // פונקציה שתופעל לאחר השליחה המוצלחת
}

const DonationForm = ({ onSuccess }: DonationFormProps) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // שינוי הערכים בטופס
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // אימות הנתונים
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "שדה זה מוגדר כשדה חובה";
    if (!formData.email) newErrors.email = "שדה זה מוגדר כשדה חובה";
    if (!formData.phone) newErrors.phone = "שדה זה מוגדר כשדה חובה";
    return newErrors;
  };

  // שליחת הטופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Submitted:", formData);
      alert("התרומה בוצעה בהצלחה!");
      onSuccess(); // מעביר שליטה למעלה
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-primary text-center">
        פרטים דרושים לתרומה
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* שם מלא */}
        <div>
          <label className="block font-semibold mb-1 text-muted-foreground">
            כתבו את שמכם המלא*
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="הכניסו את שמכם"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>
        {/* אימייל */}
        <div>
          <label className="block font-semibold mb-1 text-muted-foreground">
            מה כתובת האימייל שלכם?*
          </label>
          <input
            type="email"
            name="email"
            placeholder="הכניסו את כתובת האימייל"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        {/* טלפון */}
        <div>
          <label className="block font-semibold mb-1 text-muted-foreground">
            טלפון*
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="הכניסו את מספר הטלפון"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        {/* כפתור שליחה */}
        <Button type="submit" className="w-full bg-primary text-white">
          המשך
        </Button>
      </form>
    </div>
  );
};

export default DonationForm;
