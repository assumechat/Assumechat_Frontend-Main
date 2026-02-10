"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import EarlyAccessForm from "@/components/EarlyAccess/form";
import { FooterSection } from "@/components/Footer";

export default function GetEarlyAccessPage() {
  const reviewsRef = useRef<HTMLDivElement[]>([]);
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showPopUp, setShowPopup] = useState<boolean>(false);

  async function handleSubmit(): Promise<void> {
    try {
      const earlyAccessUser = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}early-access-form/getUserByEmail`,
        {
          email: email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (earlyAccessUser.data.data) {
        toast.error("You have already submitted the form");
        return;
      }
      const number = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}early-access-form/number`
      );

      if (number.data.data >= 100) {
        toast.error("Early access Form submission limit has been exceeded");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}early-access-form/`,
        {
          email: email,
          name: name,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Form submitted");
      router.push("/thanku");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const animateElements = () => {
        const time = Date.now() * 0.001;
        reviewsRef.current.forEach((review, index) => {
          const delay = index * 0.2;
          if (index < 2) {
            review.style.transform = `translateY(${
              Math.sin(time + delay) * 10
            }px)`;
          } else if (index < 4) {
            review.style.transform = `translateX(${
              Math.sin(time + delay) * 15
            }px)`;
          } else {
            review.style.transform = `translateY(${
              Math.sin(time + delay) * 8
            }px) translateX(${Math.cos(time + delay) * 12}px)`;
          }
        });

        iconsRef.current.forEach((icon, index) => {
          const delay = index * 0.3;
          if (index === 0) {
            icon.style.transform = `translateY(${
              Math.sin(time + delay) * 8
            }px) rotate(${Math.sin(time + delay) * 5}deg)`;
          } else if (index === 1) {
            icon.style.transform = `translateX(${
              Math.cos(time + delay) * 10
            }px) rotate(${Math.cos(time + delay) * 8}deg)`;
          } else if (index === 2) {
            icon.style.transform = `translateY(${
              Math.sin(time + delay) * 6
            }px) rotate(${Math.sin(time + delay) * 6}deg)`;
          } else {
            icon.style.transform = `translateX(${
              Math.cos(time + delay) * 12
            }px) rotate(${Math.cos(time + delay) * 10}deg)`;
          }
        });

        requestAnimationFrame(animateElements);
      };

      animateElements();
    }
  }, []);

  const addToRefs = (
    el: HTMLDivElement | null,
    index: number,
    type: "review" | "icon"
  ) => {
    if (!el) return;
    if (type === "review") reviewsRef.current[index] = el;
    else iconsRef.current[index] = el;
  };

  const BenefitCard = ({
    index,
    positionClass,
    title,
    description,
    emoji,
  }: {
    index: number;
    positionClass: string;
    title: string;
    description: string;
    emoji: string;
  }) => (
    <div
      ref={(el) => addToRefs(el, index, "review")}
      className={`absolute ${positionClass} min-w-40 sm:min-w-48 md:w-60 flex border border-black bg-white bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg transition-transform duration-300`}
    >
      <div className="text-2xl mr-3">{emoji}</div>
      <div>
        <h3 className="text-black font-bold text-md md:text-lg">{title}</h3>
        <p className="text-gray-600 text-xs md:text-sm mt-1">{description}</p>
      </div>
    </div>
  );

  const FloatingIcon = ({
    index,
    positionClass,
    icon,
  }: {
    index: number;
    positionClass: string;
    icon: "exclusive" | "rocket" | "crown" | "zap" | "clock";
  }) => {
    const iconComponents = {
      exclusive: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.7572L15.09 8.76L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.76L12 2.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      rocket: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.7572C13.6569 15.7572 15 14.414 15 12.7572C15 11.1003 13.6569 9.7572 12 9.7572C10.3431 9.7572 9 11.1003 9 12.7572C9 14.414 10.3431 15.7572 12 15.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15.7572V21.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 16.2572L4.5 19.2572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 16.2572L19.5 19.2572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 3.7572C16.5 6.2572 15 9.7572 12 12.7572C9 9.7572 7.5 6.2572 7.5 3.7572C7.5 3.22677 7.71071 2.71806 8.08579 2.34299C8.46086 1.96791 8.96957 1.7572 9.5 1.7572H14.5C15.0304 1.7572 15.5391 1.96791 15.9142 2.34299C16.2893 2.71806 16.5 3.22677 16.5 3.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      crown: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19.7572H5C4.46957 19.7572 3.96086 19.5465 3.58579 19.1714C3.21071 18.7963 3 18.2876 3 17.7572V7.7572C3 7.22677 3.21071 6.71806 3.58579 6.34299C3.96086 5.96791 4.46957 5.7572 5 5.7572H19C19.5304 5.7572 20.0391 5.96791 20.4142 6.34299C20.7893 6.71806 21 7.22677 21 7.7572V17.7572C21 18.2876 20.7893 18.7963 20.4142 19.1714C20.0391 19.5465 19.5304 19.7572 19 19.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15.7572V12.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12.7572L14 10.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12.7572L10 10.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9.7572L6 12.7572L9 7.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 9.7572L18 12.7572L15 7.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      zap: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2.7572L3 14.7572H12L11 22.7572L21 10.7572H12L13 2.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      clock: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8.7572V12.7572L15 15.7572"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21.7572C16.9706 21.7572 21 17.7278 21 12.7572C21 7.78663 16.9706 3.7572 12 3.7572C7.02944 3.7572 3 7.78663 3 12.7572C3 17.7278 7.02944 21.7572 12 21.7572Z"
            stroke="#B30738"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };

    return (
      <div
        ref={(el) => addToRefs(el, index, "icon")}
        className={`absolute ${positionClass} p-2 md:p-3 bg-white bg-opacity-80 rounded-full shadow-md transition-transform duration-300`}
      >
        {iconComponents[icon]}
      </div>
    );
  };

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
        {/* Background SVGs */}
        <div className="absolute md:rotate-0 rotate-90 pt-20 inset-0 flex items-center justify-center opacity-30">
          <svg
            width="1124"
            height="776"
            viewBox="0 0 1124 776"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_2001_4022)">
              <path
                d="M632.264 141.194C767.715 180.033 882.393 242.83 958.309 312.936C1034.25 383.065 1071.29 460.391 1051.81 528.332C1032.32 596.273 959.936 642.221 858.373 661.452C756.842 680.677 626.313 673.161 490.862 634.321C355.411 595.481 240.733 532.685 164.817 462.578C88.8779 392.449 51.8378 315.123 71.3196 247.182C90.8013 179.241 163.19 133.293 264.753 114.062C366.284 94.8376 496.813 102.354 632.264 141.194Z"
                stroke="#B30738"
              />
            </g>
            <g filter="url(#filter1_f_2001_4022)">
              <path
                d="M561.5 131.5C702.409 160.254 829.954 160.254 922.253 206.72C1014.58 253.2 1071.5 317.321 1071.5 388C1071.5 458.679 1014.58 522.8 922.253 569.28C829.954 615.746 702.409 644.5 561.5 644.5C420.591 644.5 293.046 615.746 200.747 569.28C108.419 522.8 51.5 458.679 51.5 388C51.5 317.321 108.419 253.2 200.747 206.72C293.046 160.254 420.591 131.5 561.5 131.5Z"
                stroke="#B30738"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_2001_4022"
                x="61.6885"
                y="99.4001"
                width="999.749"
                height="576.714"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="2"
                  result="effect1_foregroundBlur_2001_4022"
                />
              </filter>
              <filter
                id="filter1_f_2001_4022"
                x="47"
                y="127"
                width="1029"
                height="522"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="2"
                  result="effect1_foregroundBlur_2001_4022"
                />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Floating Benefit Cards */}
        <BenefitCard
          index={0}
          positionClass="md:top-20 w-50 md:left-1/6 top-12 right-1"
          title="Early Access Badge"
          description="Show you were among the first to join"
          emoji="🎖️"
        />
        <BenefitCard
          index={1}
          positionClass="md:top-20 hidden md:flex w-60 md:right-1/6 top-40 right-4"
          title="Exclusive Features"
          description="Access new features before everyone else"
          emoji="✨"
        />
        <BenefitCard
          index={2}
          positionClass="md:top-1/3 md:left-1/12 w-64 top-48 left-4"
          title="Priority Support"
          description="Get help faster with priority assistance"
          emoji="🚀"
        />
        <BenefitCard
          index={3}
          positionClass="md:top-1/2.5 hidden md:flex md:right-1/12 w-14 top-[45%] right-4"
          title="Beta Testing"
          description="Help shape the platform's future"
          emoji="🧪"
        />
        <BenefitCard
          index={4}
          positionClass="md:bottom-20 md:left-1/10 w-14 bottom-12 left-4"
          title="Founder's Circle"
          description="Join our exclusive community of early adopters"
          emoji="👥"
        />
        <BenefitCard
          index={5}
          positionClass="md:bottom-20 md:right-1/10 w-50 bottom-4 right-4"
          title="Special Recognition"
          description="Your profile shows early adopter status"
          emoji="⭐"
        />

        {/* Floating Icons */}
        <FloatingIcon
          index={1}
          positionClass="md:top-54 md:left-1/8 top-20 left-4"
          icon="rocket"
        />
        <FloatingIcon
          index={2}
          positionClass="md:top-62 md:right-1/4 top-80 right-4"
          icon="crown"
        />
        <FloatingIcon
          index={3}
          positionClass="md:bottom-1/4 md:right-1/14 bottom-50 right-3"
          icon="zap"
        />
        <FloatingIcon
          index={4}
          positionClass="md:bottom-1/4 md:left-1/15 left-4"
          icon="exclusive"
        />

        {/* Main Content */}
        <div className="relative pt-0 z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get <span className="text-[#B30738]">Early Access</span>
          </h1>

          <p className="text-gray-800 text-lg max-w-lg mx-auto mb-8">
            Join the exclusive social network before everyone else and become a
            founding member of our community.
          </p>

          <button
            onClick={() => {
              setShowPopup(true);
            }}
            className="bg-[#B30738] hover:bg-red-800 text-white font-bold py-3 px-20 rounded-lg text-lg transition-colors duration-300 mb-4 shadow-lg"
          >
            Get Early Access
          </button>

          <p className="text-gray-600 text-md">
            Limited spots available. Be among the first{" "}
            <span className="text-[#B30738]">500 students </span> to join and
            get permanent early adopter status.
          </p>
        </div>
      </div>
      <FooterSection />

      {/* Early Access Form Dialog */}
      <EarlyAccessForm
        showPopUp={showPopUp}
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
      />
    </>
  );
}
