import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ProjectDetails from "@/components/ProjectDetails";
import DonationSection from "@/components/DonationSection";
import DonationForm from "@/components/DonationForm";
import { useUser } from "@/components/context/userContext";
import { Project } from "@/types/projectTypes";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import FiltersBar from "@/components/FiltersBar";

const ProjectPage = () => {
  const location = useLocation();
  const { project }: { project: Project } = location.state || {};
  const [currentProject, setCurrentProject] = useState<Project>(project);
  const formRef = useRef<HTMLDivElement | null>(null);
  const donationFormRef = useRef<HTMLDivElement | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);

  const { user } = useUser();
  const { toast } = useToast();

  // Scroll to donation form if it is open
  useEffect(() => {
    if (showDonationForm) {
      donationFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showDonationForm]);

  // Handle amount click (set donation amount)
  const handleAmountClick = (amount: number) => {
    setDonationAmount(amount);
    setSelectedAmount(amount);
  };

  // Handle manual amount change (ensure it's a number)
  const handleManualAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericAmount = parseFloat(e.target.value); // Convert to number
    setDonationAmount(numericAmount);
    setSelectedAmount(null);
  };

  const submitDonation = async () => {
    try {
      const donation = {
        user_id: user ? user._id : null,
        amount: donationAmount,
        project_id: project._id,
      };

      await api.post("donations", donation, {
        withCredentials: true,
      });

      const updatedProject = {
        ...currentProject,
        current_amount: currentProject.current_amount + donationAmount,
      };

      setCurrentProject(updatedProject);
      setDonationAmount(0); // Reset donation amount
      setSelectedAmount(null); // Reset selected amount
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      toast({
        title: `התרומה בוצעה בהצלחה! סכום התרומה: ₪${donationAmount || "0"}`,
        description: "תודה רבה",
      });
    } catch (error) {
      console.error("Error during donation:", error);
      toast({
        title: "שגיאה",
        description: "התרומה לא הצליחה. נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    }
  };

  // Handle donation form submission
  const handleDonationSubmit = async () => {
    if (!user) {
      setShowDonationForm(true);
      return;
    }
    await submitDonation();
  };

  if (!project)
    return <div className="p-6 text-center text-lg font-semibold">טוען...</div>;

  return (
    <div className="p-6 container mx-auto space-y-8">
      <FiltersBar />

      {/* Project details */}
      <ProjectDetails
        project={currentProject}
        onDonateClick={() =>
          formRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* Donation section */}
      <DonationSection
        formRef={formRef}
        donationAmount={donationAmount}
        selectedAmount={selectedAmount}
        onAmountClick={handleAmountClick}
        onManualAmountChange={handleManualAmountChange}
        onSubmit={handleDonationSubmit}
        resetDonationAmount={() => setDonationAmount(0)} // אפס את השדה
      />

      {/* Donation form if user is not logged in */}
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
              setDonationAmount(0); // Reset donation amount
            }}
            submitDonation={submitDonation}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
