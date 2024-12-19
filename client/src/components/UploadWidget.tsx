import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadWidget = ({ onImageUpload }: UploadWidgetProps) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Ensure Cloudinary script is loaded
    if (!window.cloudinary) {
      console.error("Cloudinary script not loaded.");
      return;
    }

    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbxaogtvv",
        uploadPreset: "vtyqaadj",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Error uploading image:", error);
          setLoading(false); // End loading on error
        } else if (result && result.event === "success") {
          // Send the image URL back to the parent
          onImageUpload(result.info.secure_url);
          setLoading(false);
        }
      }
    );
  }, [onImageUpload]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    widgetRef.current.open();
  };

  return (
    <div>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload files"}
      </button>
    </div>
  );
};

export default UploadWidget;
