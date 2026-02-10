import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

interface BurstFeedbackDialogProps {
  showFeedbackModal: boolean;
  feedbackText: string;
  feedbackId: string;
  rating: number;
  onClose: () => void;
  onBurst: () => Promise<void>;
}

const BurstFeedbackDialog: React.FC<BurstFeedbackDialogProps> = ({
  showFeedbackModal,
  feedbackId,
  feedbackText,
  rating,
  onClose,
  onBurst,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBurst = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    console.log("insideHandleBurst");
    setIsLoading(true);

    try {
      if (!feedbackId) {
        toast.error("No feedback selected");
        return;
      }

      await onBurst();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("Error bursting assumption", err);

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
    <Dialog open={showFeedbackModal} onOpenChange={onClose}>
      <DialogContent className="mt-10 h-[445px] w-[428px] md:h-[528px] md:w-[750px] bg-white rounded-2xl p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center gap-2 flex-col md:flex-row text-3xl md:text-3xl font-bold text-center mt-8">
            <span>Burst this</span>
            <span>assumption!</span>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleBurst}
          className="flex flex-col items-center gap-4 relative"
        >
          {/* Assumption input */}
          <div className="w-full">
            <label className="text-sm text-gray-500">Assumption</label>
            <input
              type="text"
              value={feedbackText}
              readOnly
              autoFocus={false}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B30738]"
              required
            />
          </div>

          {/* Star Rating */}
          <div className="w-full flex items-center gap-2 ml-2">
            <span className="text-lg text-gray-700">Rating: </span>
            {[1, 2, 3].map((star) => (
              <FaStar
                key={star}
                className={`text-lg ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
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
            {isLoading ? "Bursting..." : "Burst It!"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BurstFeedbackDialog;
