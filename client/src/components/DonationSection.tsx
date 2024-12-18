import { Button } from "@/components/ui/button";

interface DonationSectionProps {
  formRef: React.RefObject<HTMLDivElement>;
  donationAmount: string;
  selectedAmount: string | null;
  onAmountClick: (amount: string) => void;
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
}: DonationSectionProps) => (
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
            onClick={() => onAmountClick(amount)}
            className={`border-2 rounded-full flex items-center justify-center p-3 cursor-pointer transition ${
              selectedAmount === amount
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
        className="w-full max-w-xs p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mx-auto block text-center"
      />
      <Button
        onClick={onSubmit}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg mt-4 hover:bg-ring transition duration-300 font-semibold hover:scale-105"
      >
        המשך
      </Button>
    </div>
  </div>
);

export default DonationSection;
