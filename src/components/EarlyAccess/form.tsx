import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface formProps {
  showPopUp: boolean;
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  onClose: () => void;
  onSubmit: () => Promise<void>;
}

const EarlyAccessForm: React.FC<formProps> = ({
  showPopUp,
  email,
  setEmail,
  name,
  setName,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onSubmit();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("Error submitting form", err);

      // Better error handling
      if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else if (err.response) {
        toast.error(`Server error: ${err.response.status}`);
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to burst assumption. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={showPopUp} onOpenChange={onClose}>
      <DialogContent className="mt-10 h-[445px] w-[428px] md:h-[528px] md:w-[750px] bg-white rounded-2xl p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center gap-2 flex-col text-3xl md:text-3xl font-bold text-center mt-8">
            <span>Assumechat</span>
            <span>Get Early access</span>
          </DialogTitle>
          <DialogDescription className="text-center mt-1">
            Please only provide valid emails
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 relative"
        >
          {/* email input */}
          <div className="w-full">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder=" john@hotmail.com"
              autoFocus={false}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B30738]"
              required
            />
          </div>
          <div className="w-full">
            <label className="text-sm text-gray-500">Name</label>
            <input
              type="text"
              value={name}
              placeholder="john doe"
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus={false}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B30738]"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`h-[40px] w-[199px] font-semibold py-2 rounded-md transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#B30738] hover:cursor-pointer text-white"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit!"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyAccessForm;
