import { useEffect, useRef } from "react";

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

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dbxaogtvv",
        uploadPreset: "vtyqaadj",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else if (result && result.event === "success") {
          // Send the image URL back to the parent
          onImageUpload(result.info.secure_url);
        }
      }
    );
  }, [onImageUpload]);

  const handleClick = () => {
    widgetRef.current.open();
  };

  return (
    <div>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={handleClick}
      >
        Upload files
      </button>
    </div>
  );
};

export default UploadWidget;
