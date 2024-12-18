import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ProjectDetails from "@/components/ProjectDetails";
import DonationSection from "@/components/DonationSection";
import DonationForm from "@/components/DonationForm";
import { useUser } from "@/components/context/userContext";
import { Project } from "@/types/projectTypes";

const ProjectPage = () => {
  const location = useLocation();
  const { project }: { project: Project } = location.state || {};

  const formRef = useRef<HTMLDivElement | null>(null);
  const donationFormRef = useRef<HTMLDivElement | null>(null); // גלילה לטופס התרומה
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);

  const { user } = useUser();

  // גלילה למיקום הטופס אם הוא נפתח
  useEffect(() => {
    if (showDonationForm) {
      donationFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showDonationForm]);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleAmountClick = (amount: string) => {
    setDonationAmount(amount.replace("₪", ""));
    setSelectedAmount(amount);
  };

  const handleManualAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleDonationSubmit = () => {
    if (user) {
      alert(`התרומה בוצעה בהצלחה! סכום התרומה: ₪${donationAmount || "0"}`);
    } else {
      setShowDonationForm(true);
    }
  };

  if (!project)
    return <div className="p-6 text-center text-lg font-semibold">טוען...</div>;

  return (
    <div className="p-6 container mx-auto space-y-8">
      {/* פרטי הפרויקט */}
      <ProjectDetails project={project} onDonateClick={scrollToForm} />

      {/* חלק של התרומה */}
      <DonationSection
        formRef={formRef}
        donationAmount={donationAmount}
        selectedAmount={selectedAmount}
        onAmountClick={handleAmountClick}
        onManualAmountChange={handleManualAmountChange}
        onSubmit={handleDonationSubmit}
      />

      {/* טופס התרומה אם המשתמש לא מחובר */}
      {showDonationForm && (
        <div
          ref={donationFormRef}
          className="bg-background p-6 rounded-lg shadow-md"
        >
          <h3 className="text-center text-2xl font-bold mb-4 text-primary">
            מלאו את פרטי התרומה
          </h3>
          <DonationForm
            onSuccess={() => {
              setShowDonationForm(false);
              alert("ההרשמה והתרומה בוצעו בהצלחה!");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
