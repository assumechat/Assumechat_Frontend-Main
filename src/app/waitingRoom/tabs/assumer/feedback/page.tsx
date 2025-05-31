'use client';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(3);
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
 //handle form submit
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim() || !rating) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-feedback`,
        {
          comment: feedbackText,
          name: user?.name,
          rating,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.success('Feedback sent, thank you');
      setFeedbackText('');
      setRating(3); 
      router.push('/waitingRoom/tabs/assumer/report');
    } catch (error) {
      toast.error('Failed to send feedback. Please try again.');
      console.error('Feedback submission error:', error);
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-white-50 px-4">

      <form
        onSubmit={handleFeedbackSubmit}
        className=" flex flex-col items-center justify-center relative px-4 
           bg-white-50/0 backdrop-blur-sm rounded-lg 
           p-6 w-full max-w-3xl"
      >
        <div
          className="absolute top-0 left-0 w-40 h-40 bg-no-repeat bg-center opacity-10"
          style={{ backgroundImage: 'url(/circle-bg.svg)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-40 h-40 bg-no-repeat bg-center opacity-10"
          style={{ backgroundImage: 'url(/circle-bg.svg)' }}
        />
        <h2 className="text-xl sm:text-4xl font-bold text-black text-center">
          Chat ended – ready to assume?
        </h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Write an assumption about{' '}
          <span className="text-[#B30738] font-semibold">CrypticCloud</span>
        </p>
        {/*comment*/}
        <div className="mt-6 w-full max-w-xl">
          <label className="text-sm text-gray-500">
            Here’s something: Based on the chat, guess one hobby or fun fact about them!
          </label>
          <input
            type="text"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B30738]"
            placeholder=" Type your assumption here…."
          />
        </div>
        {/*Rating*/}
        <div className="mt-4 flex items-center gap-2">
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

        <button
          type="submit"
          className="mt-6 bg-[#B30738] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#B30738] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
