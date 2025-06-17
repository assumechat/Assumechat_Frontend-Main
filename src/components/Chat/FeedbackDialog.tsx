import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FaStar } from 'react-icons/fa';

interface FeedbackDialogProps {
    showFeedbackModal: boolean;
    setShowFeedbackModal: (value: boolean) => void;
    feedbackText: string;
    setFeedbackText: (value: string) => void;
    rating: number;
    setRating: (value: number) => void;
    user: { name: string };
    peerInfo: { userName: string };
    handleFeedbackSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
    showFeedbackModal,
    setShowFeedbackModal,
    feedbackText,
    setFeedbackText,
    rating,
    setRating,
    handleFeedbackSubmit,
    user,
    peerInfo
}) => {
    return (
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
            <DialogContent className="fixed right-0 mt-10 h-[80vh] w-full max-w-4xl bg-white rounded-l-xl p-6 shadow-lg overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mt-8">
                        Chat ended – ready to assume?
                    </DialogTitle>
                    <DialogDescription className="text-center mt-1">
                        Write an assumption about <span className="text-[#B30738] font-semibold">{peerInfo.userName}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4 relative">
                    {/* Feedback input */}
                    <div className="w-full">
                        <label className="text-sm text-gray-500">
                            Here’s something: Based on the chat, guess one hobby or fun fact about them!
                        </label>
                        <input
                            type="text"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B30738]"
                            placeholder="Type your assumption here…."
                        />
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-700">Rate them:</span>
                        {[1, 2, 3].map((star) => (
                            <FaStar
                                key={star}
                                size={20}
                                onClick={() => setRating(star)}
                                className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'} cursor-pointer`}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 bg-[#B30738] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#901e36] transition"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowFeedbackModal(false)}
                        className="px-4 py-2 text-red-500 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Skip For Now
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FeedbackDialog;
