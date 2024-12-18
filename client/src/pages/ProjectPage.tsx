import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ProjectDetails from "@/components/ProjectDetails";
import DonationSection from "@/components/DonationSection";
import DonationForm from "@/components/DonationForm";
import { useUser } from "@/components/context/userContext";
import { Project } from "@/types/projectTypes";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";

const ProjectPage = () => {
  const location = useLocation();
  const { project }: { project: Project } = location.state || {};

  const formRef = useRef<HTMLDivElement | null>(null);
  const donationFormRef = useRef<HTMLDivElement | null>(null); // גלילה לטופס התרומה
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);

  const { user } = useUser();
  const { toast } = useToast();

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

  const handleDonationSubmit = async () => {
    try {
      console.log("Aaa");
      if (user) {
        const donation = {
          user_id: user._id,
          amount: donationAmount,
          project_id: project._id,
        };
        const res = await api.post("donations", donation, {
          withCredentials: true,
        });
        console.log(res.data);
        toast({
          title: `התרומה בוצעה בהצלחה! סכום התרומה: ₪${donationAmount || "0"}`,
          description: "תודה רבה",
        });
      } else {
        setShowDonationForm(true);
      }
    } catch (error) {
      console.log(error);
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
              toast({
                title: `התרומה בוצעה בהצלחה! סכום התרומה: ₪${
                  donationAmount || "0"
                }`,
                description: "תודה רבה",
              });
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
