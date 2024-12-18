import { Button } from "@/components/ui/button";
import { useUser } from "./context/userContext";

interface DonationSectionProps {
  formRef: React.RefObject<HTMLDivElement>;
  donationAmount: number;
  selectedAmount: number | null;
  onAmountClick: (amount: number) => void;
  onManualAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const DonationSection = ({
  formRef,
  donationAmount,
  selectedAmount,
  onAmountClick,
  onManualAmountChange,
  onSubmit,
}: DonationSectionProps) => {
  const { isLoggedIn } = useUser();

  // Function to handle amount click and convert to a number
  const handleAmountClick = (amount: string) => {
    const numericAmount = parseFloat(amount.replace("₪", "")); // Remove ₪ and convert to number
    onAmountClick(numericAmount); // Call the onAmountClick with the numeric value
  };

  return (
    <div
      className="bg-background p-6 rounded-lg shadow-md text-center"
      ref={formRef}
    >
      <h2 className="text-xl font-bold mb-4 text-primary">בחרו סכום לתרומה</h2>
      <div className="grid grid-cols-3 gap-4">
        {["₪25", "₪50", "₪100", "₪150", "₪200", "₪500", "₪1000", "₪5000"].map(
          (amount) => (
            <div
              key={amount}
              onClick={() => handleAmountClick(amount)} // Use the modified handler
              className={`border-2 rounded-full flex items-center justify-center p-3 cursor-pointer transition ${
                selectedAmount === parseFloat(amount.replace("₪", "")) // Compare as number
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              <span className="font-semibold">{amount}</span>
            </div>
          )
        )}
      </div>
      <div className="mt-6">
        <p className="text-sm font-semibold mb-2 text-muted-foreground">
          או הזינו סכום אחר לתרומה
        </p>
        <input
          type="number"
          value={donationAmount}
          onChange={onManualAmountChange}
          placeholder="הזינו סכום"
          className="w-full max-w-xs p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mx-auto block text-center bg-background text-foreground appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <Button
          onClick={onSubmit}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg mt-4 hover:bg-ring transition duration-300 font-semibold hover:scale-105"
        >
          {isLoggedIn ? `תשלום` : `המשך`}
        </Button>
      </div>
    </div>
  );
};

export default DonationSection;
