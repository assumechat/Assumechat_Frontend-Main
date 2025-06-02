'use client';

import { useState, useRef, useEffect } from 'react';
import { FiInfo, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { sendMessage, skipMatch, clearMessages, matched, leaveQueue, joinQueue } from '@/store/slices/socketSlice';
import { toast } from "sonner"
import { getChatSocket } from '@/Services/socketService';
import { ChatEvent } from '@/types/Chat';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { EyeIcon, HeartIcon, ChatIcon } from '@/components/Icons/eye';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";



const ChatSystem = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(state => state.socket.messages);
    const chatConnected = useAppSelector(state => state.socket.chatConnected);
    const matchedState = useAppSelector(state => state.socket.matched);
    const [showFeedbackModal ,  setshowFeedbackModal]=useState(false);
    const [feedbackText , setFeedbackText]= useState('');
    const [rating , setRating] = useState(3);
    const { position, waiting, online } = useAppSelector(s => s.socket);
    const [inputValue, setInputValue] = useState('');
    const [isMatching, setIsMatching] = useState(!matchedState); // Manual state for UI sync
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter(); 
    const [peerInfo, setPeerInfo] = useState<{ userId: string; userName?: string } | null>(null);
    // Listen for peer skip/leave events (handled below with getChatSocket)
    const user = useAppSelector((state) => state.user.user);
    const [showReportModal , setShowReportModal]= useState(false);
    const [reportData , setReportData]= useState<any>(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [details, setDetails] = useState('');
    const [showMatchedUser ,  setShowMatchedUser]=useState(false);

  useEffect(() => {
    if (matchedState) {
      setShowMatchedUser(true);

      const timer = setTimeout(() => {
        setShowMatchedUser(false);      
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [matchedState]);


    // Watch for own match updates (Redux)
    useEffect(() => {
        if (matchedState) {
            setIsMatching(false);
        } else {
            setIsMatching(true);
        }
    }, [matchedState]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const chatSocket = getChatSocket();

        function onPeerHandshake(payload: { userId: string; userName?: string }) {
            toast(`${payload.userName ?? 'Peer'} has joined the room!`);
            // you can also store these in Redux if you want
            setPeerInfo(payload);
        }
        chatSocket.on(ChatEvent.HANDSHAKE, onPeerHandshake);
        return () => {
            chatSocket.off(ChatEvent.HANDSHAKE, onPeerHandshake);
        };
    }, [dispatch]);


    // Send a chat message
    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const text = inputValue.trim();
        if (text && matchedState) {
            dispatch(sendMessage(text));
            setInputValue('');
        }
    };

    // Skip to next user
    const handleSkip = () => {
        setIsMatching(true);
         toast.success('Skipped used , Please give feedback');
        setshowFeedbackModal(true);
        dispatch(clearMessages());
        dispatch(skipMatch());
        //toast.success('Skipped user, searching for a new match...');
       // setshowFeedbackModal(true);
        //  handleRetry();
    };

    //feedback submit handler
    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedbackText.trim() || !rating) return;
       // console.log("peerRef",peerRef.current?.userId)
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-feedback`,
                {
                    feedbackBy: user?._id ,
                    feedbackTo:peerInfo?.userId,
                    comment: feedbackText,
                    rating,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            toast.success('Feedback sent, thank you!');
            setFeedbackText('');
            setRating(3);
            setshowFeedbackModal(false);
            // Optionally redirect or reset state here
            setShowReportModal(true);
        } catch (error) {
            toast.error('Failed to send feedback. Please try again.');
            console.error('Feedback submission error:', error);
        }
    };

    //handle report
    const reasons = [
        'Harassment or hate',
        'Spam / ads',
        'Inappropriate content',
        'Impersonation',
        'Other',
      ];
    
      const handleReportSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/submit-report`, {
            reasons:selectedReason,
            details,
            userId: peerInfo?.userId,
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
    const handleRetry = () => {
        // clear any stale chat state
        dispatch(clearMessages());
        dispatch(matched(null));
        // leave & rejoin the queue
        dispatch(leaveQueue());
        dispatch(joinQueue());
        toast('Searching again…');
    };

    useEffect(() => {
        const chatSocket = getChatSocket();
        function onPeerLeft() {
            dispatch(clearMessages());
            dispatch(matched(null));
            toast.info('The other user skipped. Looking for a new match...');
        }
        chatSocket.on('peerLeft', onPeerLeft);
        return () => {
            chatSocket.off('peerLeft', onPeerLeft);
        };
    }, [dispatch]);
    // Show loader while matching
    if (isMatching) {
        return (
            <div className="flex flex-col items-center justify-center h-full pt-24">
                <svg className="animate-spin h-8 w-8 text-[#B30738] mb-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <p className="text-gray-600">Online users: {online}</p>
                <p className="text-gray-600">Queue Position: {position}</p>
                <p className="text-gray-800 font-medium mt-2">Matching you with someone...</p>
                <button
                    onClick={handleRetry}
                    className="mt-6 px-4 py-2 bg-[#B30738] text-white rounded hover:bg-[#901e36] transition"
                >
                    Find someone else
                </button>
            </div>
        );
    }

    const suggestions = [
        'Assume something about me',
        'Take a wild guess...',
        "What's your first impression of me?"
    ];

    return (
        <div className="flex flex-col md:mt-20 h-screen rounded-2xl border-4 bg-gray-200">
            {/* Top Bar - Sticky */}
            <div className="sticky top-0 z-10 m-4 p-4 bg-white rounded-3xl flex items-center justify-between border-b border-gray-300">
                <div className="flex items-center space-x-3">
                    {peerInfo && (
                        <>
                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                                    alt="User avatar"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="font-semibold text-[#B30738]">{peerInfo.userId ?? peerInfo.userName}</h2>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleSkip}
                        disabled={isMatching}
                        className="p-2 border-[#B30738] border-1 rounded-xl text-gray-600 hover:text-gray-900"
                    >
                        <LogOutIcon color='#B30738' size={20} />
                    </button>
                    <button className="p-2 border-[#B30738] border-1 rounded-xl text-gray-600 hover:text-gray-900">
                        <FiInfo color='#B30738' size={20} />
                    </button>
                </div>
            </div>

            {/* Chat Area - Flexible Space */}
            <div className="flex-1 overflow-y-auto p-6 pb-32">
                {/* Messages */}
                <div className="space-y-4">
                    {messages.map((m, idx) => (
                        <div
                            key={m.timestamp}
                            className={`flex ${m.peerId === matchedState?.peer ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${m.peerId === matchedState?.peer ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                                    <Image
                                        src={m.peerId === matchedState?.peer ? 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png' : 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg'}
                                        alt="User avatar"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                                <div className={`mx-2 px-4 py-2 rounded-lg ${m.peerId === matchedState?.peer
                                    ? 'bg-[#B30738] text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                    }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {/* Input Area - Fixed Bottom */}
            <div className="sticky bottom-0 border-t border-gray-300 p-3 bg-gray-200">
                {messages.length === 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-24 w-full ">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => setInputValue(s)}
                                className="text-xs md:text-sm border border-gray-400 px-3 py-1.5 hover:bg-gray-100 rounded-full text-gray-700 transition"
                                disabled={isMatching}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSend} className="flex mt-3 border border-gray-700 rounded-lg items-center max-w-5xl mx-auto">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 px-4 py-2  rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#B30738]"
                        disabled={isMatching}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isMatching}
                        className="px-4 py-2  text-white rounded-r-lg disabled:opacity-50"
                    >
                        <FiSend size={20} color='#B30738' />
                    </button>
                </form>
               {showFeedbackModal && (
  <Dialog open={showFeedbackModal} onOpenChange={setshowFeedbackModal}>
    <DialogContent className="fixed right-0 mt-10 h-[80vh] w-full max-w-4xl bg-white rounded-l-xl p-6 shadow-lg overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center mt-8">Chat ended – ready to assume?</DialogTitle>
        <DialogDescription className="text-center mt-1">
          Write an assumption about <span className="text-[#B30738] font-semibold">CrypticCloud</span>
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4 mt-1 relative">
        {/* Feedback input */}
        <div className="w-full">
          <label className="text-sm text-gray-500">
            Based on the chat, guess one hobby or fun fact about them!
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
              className={`${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } cursor-pointer`}
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
      </form>
    </DialogContent>
  </Dialog>
)}
    {showReportModal && (
  <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
    <DialogContent className="fixed right-0 mt-10 h-[80vh] w-full max-w-4xl bg-white rounded-l-xl p-6 shadow-lg overflow-y-auto">
      
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold text-black mb-2 text-center">
          Report CrypticCloud
        </DialogTitle>
        <DialogDescription className="text-gray-600 mb-6 text-center">
          Tell us what went wrong conversing with <span className="text-[#B30738] font-semibold">CrypticCloud</span>
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleReportSubmit} className="w-full max-w-lg space-y-4">
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
)}

       { showMatchedUser && (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 py-12 relative overflow-hidden">
              {/* Top-left SVG Background */}
              <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 sm:-translate-x-1/3 sm:-translate-y-1/3">
                <svg
                  width="227"
                  height="283"
                  viewBox="0 0 227 283"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[150px] h-[187px] sm:w-[227px] sm:h-[283px]"
                >
                  <g filter="url(#filter0_f_380_154550)">
                    <circle cx="85.973" cy="141.973" r="105.473" stroke="#B30738" />
                    <circle cx="85.4798" cy="141.48" r="78.9798" stroke="#B30738" />
                    <circle cx="85.9865" cy="141.987" r="52.4865" stroke="#B30738" />
                    <circle cx="85.5" cy="141.5" r="137" stroke="#B30738" />
                  </g>
                </svg>
              </div>
        
              {/* Bottom-right SVG Background */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 sm:translate-x-1/3 sm:translate-y-1/3">
                <svg
                  width="361"
                  height="396"
                  viewBox="0 0 361 396"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[240px] h-[263px] sm:w-[361px] sm:h-[396px]"
                >
                  <g filter="url(#filter0_f_380_154529)">
                    <circle cx="197.518" cy="197.518" r="149.018" stroke="#B30738" />
                    <circle cx="198.139" cy="198.139" r="111.639" stroke="#B30738" />
                    <circle cx="197.759" cy="197.759" r="74.2591" stroke="#B30738" />
                    <circle cx="198" cy="198" r="193.5" stroke="#B30738" />
                  </g>
                </svg>
              </div>
        
              {/* Heading */}
              <h1 className="text-4xl font-bold text-black mb-2">You Just Got Matched!</h1>
              <p className="text-gray-600 mb-8">
                You're now chatting with{`${peerInfo?.userName}`}
                <span className="text-rose-700 font-semibold">CrypticCloud</span> – hang out or skip when you're ready.
              </p>
        
              {/* Orbit Avatar Section */}
             <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
                 {/* Horizontal Ellipse */}
                    <svg
                    viewBox="0 0 509 509"
                    className="absolute w-full h-full animate-spin-slow"
                    style={{transform: 'rotate(175deg)'}}
                    xmlns="http://www.w3.org/2000/svg"
                     >
                    <ellipse
                    cx="254.5"
                    cy="254.5"
                    rx="253.5"
                     ry="125"
                    stroke="#B30738"
                    strokeWidth="1"
                    fill="none"
                    />
                </svg>
        
                 {/* Vertical Ellipse */}
                    <svg
                    viewBox="0 0 509 509"
                    className="absolute w-full h-full animate-spin-slow"
                    style={{ transform: 'rotate(25deg)' }}
                     xmlns="http://www.w3.org/2000/svg"
                    >
                     <ellipse
                    cx="254.5"
                    cy="254.5"
                    rx="253.5"
                      ry="125"
                    stroke="#B30738"
                    strokeWidth="1"
                    fill="none"
                    />
                    </svg>
        
                {/* Avatars */}
                <div className="absolute top-1/2 left-1/2 -translate-x-[60px] -translate-y-[40px]">
                  <Image
                    src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_qkwdzs.jpg"
                    alt="Avatar 1"
                    width={60}
                    height={60}
                    className="rounded-full border-2 shadow-lg"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 translate-x-[10px] -translate-y-[50px]">
                  <Image
                    src="https://res.cloudinary.com/dipywb0lr/image/upload/v1746702005/image_jmhhxy.png"
                    alt="Avatar 2"
                    width={60}
                    height={60}
                    className="rounded-full border-2 shadow-lg"
                  />
                </div>
        
                {/* Orbit Icons */}
                {/* Orbit Icons Positioned Along the Ellipse */}
        <div className="absolute" style={{ top: '20%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
          <div className="bg-white-blur rounded-full shadow-md p-2 hover:scale-110 transition">
            <ChatIcon />
          </div>
        </div>
        
        <div className="absolute" style={{ top: '50%', left: '93%', transform: 'translate(-50%, -50%) rotate(15deg)' }}>
          <div className="bg-white rounded-full shadow-md p-2 hover:scale-110 transition">
            <EyeIcon />
          </div>
        </div>
        
        <div className="absolute" style={{ top: '70%', left: '10%', transform: 'translate(-50%, -50%) rotate(-15deg)' }}>
          <div className="bg-white rounded-full shadow-md p-2 hover:scale-110 transition">
            <HeartIcon />
          </div>
        </div>
        
              </div>
            </div>
        )}
            </div>
    </div>

    );
};

export default ChatSystem;