import Modal from "react-modal";
import { LoginModalProps } from "@/types/loginTypes";
const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-dark-overlay"
      overlayClassName="fixed inset-0"
      ariaHideApp={false}
    >
      <div className="bg-card p-6 rounded-lg shadow-lg w-96 text-card-foreground dark:bg-dark-card dark:text-dark-card-foreground text-center">
        <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-dark-foreground">
          Login
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded bg-input text-foreground placeholder-muted-foreground dark:bg-dark-input dark:text-dark-foreground dark:placeholder-dark-muted-foreground"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded bg-input text-foreground placeholder-muted-foreground dark:bg-dark-input dark:text-dark-foreground dark:placeholder-dark-muted-foreground"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded w-full hover:bg-ring dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-ring"
          >
            Login
          </button>
        </form>
        <p className="mt-3">
           להרשמות לחץ 
        <a href="/signup" className="text-purple-500"> כאן  </a>
        </p>
        <br />
        <button
          onClick={onClose}
          className="mt-1 text-destructive dark:text-dark-destructive "
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
