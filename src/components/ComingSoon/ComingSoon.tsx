"use client";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen pt-16 bg-white overflow-hidden">
      {/* Background SVGs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4">
          <svg
            width="227"
            height="283"
            viewBox="0 0 227 283"
            fill="none"
            className="w-[150px] h-[187px]"
          >
            <g filter="url(#filter0_f_380_154550)">
              <circle cx="85.973" cy="141.973" r="105.473" stroke="#B30738" />
              <circle cx="85.4798" cy="141.48" r="78.9798" stroke="#B30738" />
              <circle cx="85.9865" cy="141.987" r="52.4865" stroke="#B30738" />
              <circle cx="85.5" cy="141.5" r="137" stroke="#B30738" />
            </g>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
          <svg
            width="361"
            height="396"
            viewBox="0 0 361 396"
            fill="none"
            className="w-[240px] h-[263px]"
          >
            <g filter="url(#filter0_f_380_154529)">
              <circle cx="197.518" cy="197.518" r="149.018" stroke="#B30738" />
              <circle cx="198.139" cy="198.139" r="111.639" stroke="#B30738" />
              <circle cx="197.759" cy="197.759" r="74.2591" stroke="#B30738" />
              <circle cx="198" cy="198" r="193.5" stroke="#B30738" />
            </g>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 p-5 rounded-full bg-green-100 text-green-600 shadow-md"
        >
          <Clock className="w-16 h-16 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Coming Soon...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg text-gray-600 mb-8 max-w-xl"
        >
          We&apos;re building something amazing for you. Sit tight while we put
          on the finishing touches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <button
            onClick={() => router.push("/")}
            className="py-3 px-6 rounded-lg font-medium text-white bg-[#B30738] hover:bg-[#9a0630] transition-colors"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
