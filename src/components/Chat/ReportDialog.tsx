import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReportDialogProps {
  showReportModal: boolean;
  setShowReportModal: (value: boolean) => void;
  reasons: string[];
  selectedReason: string;
  setSelectedReason: (reason: string) => void;
  details: string;
  setDetails: (value: string) => void;
  user: { name: string };
  peerInfo: { userName: string };
  handleReportSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ReportDialog: React.FC<ReportDialogProps> = ({
  showReportModal,
  setShowReportModal,
  reasons,
  selectedReason,
  setSelectedReason,
  details,
  setDetails,
  handleReportSubmit,
  user,
  peerInfo
}) => {
  return (
    <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
      <DialogContent className="fixed right-0 mt-10 md:min-w-xl h-[80vh] w-full max-w-4xl bg-white rounded-l-xl p-6 shadow-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-black mb-2 text-center">
            Report {peerInfo.userName}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mb-6 text-center">
            Tell us what went wrong conversing with{' '}
            <span className="text-[#B30738] font-semibold">{peerInfo.userName}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleReportSubmit} className="w-full  space-y-4">
          {reasons.map((reason) => (
            <label
              key={reason}
              className="flex items-center border border-gray-300 rounded px-4 py-2 cursor-pointer hover:border-[#B30738]"
            >
              <input
                type="radio"
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="mr-3 text-[#B30738]"
              />
              {reason}
            </label>
          ))}

          {selectedReason === 'Other' && (
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1">Please Specify:</label>
              <textarea
                placeholder="Give us some details about your conversation..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#B30738]"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#B30738] text-white py-2 px-4 rounded hover:bg-[#B30738] transition"
          >
            Submit
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
