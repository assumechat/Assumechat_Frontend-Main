'use client';
import  { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export default function ReportUserPage() {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();
  const user= useAppSelector((state)=> state.user.user);
  const reasons = [
    'Harassment or hate',
    'Spam / ads',
    'Inappropriate content',
    'Impersonation',
    'Other',
  ];

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-report`, {
        reasons:selectedReason,
        details,
        userId: user?._id,
        name: user?.name
    },
    {
        headers: {'Content-Type' : 'application/json'},
    }
);
    toast.success("Report submitted successfully");
    setDetails('');
    setSelectedReason('');
    router.push('/waitingRoom/tabs/assumer');
    }
    catch(error){
        console.error("Error submitting report" , error);
        toast.error("Failed to submitting report");
    } 
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-black mb-2 text-center">Report CrypticCloud</h1>
      <p className="text-gray-600 mb-6 text-center">
        Tell us what went wrong conversing with <span className="text-[#B30738] font-semibold">CrypticCloud</span>
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
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
              placeholder="Give us some details about your conversation.."
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
    </div>
  );
}
