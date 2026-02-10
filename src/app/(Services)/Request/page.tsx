"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Bug, Wand2, CircleHelp, Check } from "lucide-react";

export default function BugReportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "bug" as const,
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.post(`${url}app-feedback`, formData);

      toast.success("Report submitted successfully!", {
        description: "Thank you for helping us improve our service.",
        icon: <Check className="w-4 h-4" />,
      });

      router.push("/thanku");
    } catch (error) {
      console.log(error);
      toast.error("Submission failed", {
        description:
          "There was an error submitting your report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-16 overflow-hidden bg-white">
      {/* Background layer with absolute positioned SVGs */}
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Submit a Feature or Bug Report
            </h1>
            <p className="text-gray-600">
              Help us improve by sharing your issues, ideas or suggestions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-[#B30738]"
                placeholder="A clear and concise title for your report"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Brief description of your issue or idea
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    value: "enhancement",
                    icon: <Wand2 className="mx-auto h-5 w-5 mb-1" />,
                    label: "Enhancement",
                    description: "Improve an existing feature",
                  },
                  {
                    value: "bug",
                    icon: <Bug className="mx-auto h-5 w-5 mb-1" />,
                    label: "Bug Fix",
                    description: "Report a bug or issue",
                  },
                  {
                    value: "feature",
                    icon: <Wand2 className="mx-auto h-5 w-5 mb-1" />,
                    label: "New Feature",
                    description: "Suggest a new feature",
                  },
                  {
                    value: "other",
                    icon: <CircleHelp className="mx-auto h-5 w-5 mb-1" />,
                    label: "Other",
                    description: "Other type of request",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      formData.type === option.value
                        ? "border-[#B30738] bg-[#B30738]/10"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={formData.type === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      {option.icon}
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      <p className="text-xs text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-[#B30738]"
                placeholder="Provide details, steps to reproduce, or ideas to enhance"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B30738] focus:border-[#B30738]"
                placeholder="Your email if you'd like a response"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#B30738] hover:bg-[#9a0630] text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B30738] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
