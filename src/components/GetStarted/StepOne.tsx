import React from 'react';

interface StepOneProps {
  academicData: {
    university: string;
    course: string;
    year: string;
  };
  handleAcademicChange: (field: string, value: string) => void;
}

const GraduationCapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_385_2015)">
      <path d="M23.6025 9.09532L12.3525 3.09532C12.244 3.03754 12.1229 3.00732 12 3.00732C11.8771 3.00732 11.756 3.03754 11.6475 3.09532L0.39751 9.09532C0.277514 9.15927 0.17716 9.25464 0.107185 9.37123C0.0372091 9.48781 0.000244141 9.62123 0.000244141 9.7572C0.000244141 9.89317 0.0372091 10.0266 0.107185 10.1432C0.17716 10.2598 0.277514 10.3551 0.39751 10.4191L3.00001 11.8075V16.3469C2.99923 16.7153 3.13481 17.0709 3.38064 17.3453C4.60876 18.7131 7.36032 21.0072 12 21.0072C13.5384 21.0199 15.0653 20.7413 16.5 20.186V23.2572C16.5 23.4561 16.579 23.6469 16.7197 23.7875C16.8603 23.9282 17.0511 24.0072 17.25 24.0072C17.4489 24.0072 17.6397 23.9282 17.7803 23.7875C17.921 23.6469 18 23.4561 18 23.2572V19.4613C18.978 18.8967 19.8618 18.1828 20.6194 17.3453C20.8652 17.0709 21.0008 16.7153 21 16.3469V11.8075L23.6025 10.4191C23.7225 10.3551 23.8229 10.2598 23.8928 10.1432C23.9628 10.0266 23.9998 9.89317 23.9998 9.7572C23.9998 9.62123 23.9628 9.48781 23.8928 9.37123C23.8229 9.25464 23.7225 9.15927 23.6025 9.09532ZM12 19.5072C7.94345 19.5072 5.55751 17.5253 4.50001 16.3469V12.6072L11.6475 16.4191C11.756 16.4769 11.8771 16.5071 12 16.5071C12.1229 16.5071 12.244 16.4769 12.3525 16.4191L16.5 14.2075V18.5519C15.3188 19.1031 13.83 19.5072 12 19.5072ZM19.5 16.3431C19.0504 16.842 18.5474 17.29 18 17.6791V13.4069L19.5 12.6072V16.3431ZM17.625 11.9078L17.6044 11.8956L12.3544 9.09532C12.1792 9.00586 11.9759 8.98878 11.7883 9.04777C11.6007 9.10675 11.4437 9.23709 11.3513 9.41069C11.2588 9.58429 11.2382 9.78726 11.294 9.97588C11.3498 10.1645 11.4774 10.3237 11.6494 10.4191L16.0313 12.7572L12 14.9069L2.34376 9.7572L12 4.60751L21.6563 9.7572L17.625 11.9078Z" fill="#B30738" />
    </g>
    <defs>
      <clipPath id="clip0_385_2015">
        <rect width="20" height="20" fill="white" transform="translate(0 0.757202)" />
      </clipPath>
    </defs>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 3.7572C14.5678 3.7572 12.9113 5.4597 12 8.05564C11.0887 5.4597 9.43219 3.7572 7.5 3.7572C4.55625 3.7572 2.25 7.71064 2.25 12.7572C2.25 17.8038 4.55625 21.7572 7.5 21.7572C9.43219 21.7572 11.0887 20.0547 12 17.4588C12.9113 20.0547 14.5678 21.7572 16.5 21.7572C19.4438 21.7572 21.75 17.8038 21.75 12.7572C21.75 7.71064 19.4438 3.7572 16.5 3.7572ZM10.0237 18.2313C9.32156 19.5185 8.40188 20.2572 7.5 20.2572C6.59812 20.2572 5.67844 19.5185 4.97625 18.2313C4.52231 17.3704 4.19878 16.4469 4.01625 15.491C4.47317 15.6975 4.97457 15.7862 5.47461 15.7489C5.97464 15.7117 6.45737 15.5497 6.87867 15.2778C7.29996 15.0059 7.64638 14.6327 7.88625 14.1924C8.12613 13.7521 8.25181 13.2586 8.25181 12.7572C8.25181 12.2558 8.12613 11.7624 7.88625 11.322C7.64638 10.8817 7.29996 10.5085 6.87867 10.2366C6.45737 9.9647 5.97464 9.80272 5.47461 9.76549C4.97457 9.72825 4.47317 9.81694 4.01625 10.0235C4.19878 9.06751 4.52231 8.144 4.97625 7.28314C5.67844 5.99595 6.59812 5.2572 7.5 5.2572C8.40188 5.2572 9.32156 5.99595 10.0237 7.28314C10.8141 8.73251 11.25 10.6769 11.25 12.7572C11.25 14.8375 10.8141 16.7819 10.0237 18.2313ZM3.75 12.7572C3.75 12.4605 3.83797 12.1705 4.0028 11.9238C4.16762 11.6772 4.40189 11.4849 4.67597 11.3714C4.95006 11.2579 5.25166 11.2281 5.54264 11.286C5.83361 11.3439 6.10088 11.4868 6.31066 11.6965C6.52044 11.9063 6.6633 12.1736 6.72118 12.4646C6.77906 12.7555 6.74935 13.0571 6.63582 13.3312C6.52229 13.6053 6.33003 13.8396 6.08336 14.0044C5.83668 14.1692 5.54667 14.2572 5.25 14.2572C4.85218 14.2572 4.47064 14.0992 4.18934 13.8179C3.90804 13.5366 3.75 13.155 3.75 12.7572ZM19.0238 18.2313C18.3216 19.5185 17.4019 20.2572 16.5 20.2572C15.5981 20.2572 14.6784 19.5185 13.9762 18.2313C13.5223 17.3704 13.1988 16.4469 13.0162 15.491C13.4732 15.6975 13.9746 15.7862 14.4746 15.7489C14.9746 15.7117 15.4574 15.5497 15.8787 15.2778C16.3 15.0059 16.6464 14.6327 16.8863 14.1924C17.1261 13.7521 17.2518 13.2586 17.2518 12.7572C17.2518 12.2558 17.1261 11.7624 16.8863 11.322C16.6464 10.8817 16.3 10.5085 15.8787 10.2366C15.4574 9.9647 14.9746 9.80272 14.4746 9.76549C13.9746 9.72825 13.4732 9.81694 13.0162 10.0235C13.1988 9.06751 13.5223 8.144 13.9762 7.28314C14.6784 5.99595 15.5981 5.2572 16.5 5.2572C17.4019 5.2572 18.3216 5.99595 19.0238 7.28314C19.8141 8.73251 20.25 10.6769 20.25 12.7572C20.25 14.8375 19.8141 16.7819 19.0238 18.2313ZM12.75 12.7572C12.75 12.4605 12.838 12.1705 13.0028 11.9238C13.1676 11.6772 13.4019 11.4849 13.676 11.3714C13.9501 11.2579 14.2517 11.2281 14.5426 11.286C14.8336 11.3439 15.1009 11.4868 15.3107 11.6965C15.5204 11.9063 15.6633 12.1736 15.7212 12.4646C15.7791 12.7555 15.7494 13.0571 15.6358 13.3312C15.5223 13.6053 15.33 13.8396 15.0834 14.0044C14.8367 14.1692 14.5467 14.2572 14.25 14.2572C13.8522 14.2572 13.4706 14.0992 13.1893 13.8179C12.908 13.5366 12.75 13.155 12.75 12.7572Z" fill="#B30738" />
  </svg>

);

export default function StepOne({ academicData, handleAcademicChange }: StepOneProps) {
  return (
    <>
      <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <h1 className="font-geist text-xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-gray-900">
          Tell Us About Your Academic Journey
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          We’re building a space where students can connect meaningfully. A little about your
          education helps <br />us do that better. Don’t worry, your details won’t be shared publicly.
        </p>
        {/* University */}
        <div>
          <label className=" w-full text-xs sm:text-sm md:text-base font-bold text-gray-700 mb-1 flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
            <GraduationCapIcon />
            University Name
          </label>
          <select
            value={academicData.university}
            onChange={(e) => handleAcademicChange('university', e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B30738] focus:outline-none mt-1 text-sm sm:text-base"
          >
            <option value="">Choose Your University</option>
            <option value="Nirma">Nirma</option>
            <option value="DU">DU</option>
            <option value="IIT Bombay">IIT Bombay</option>
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="w-full text-xs sm:text-sm md:text-base font-bold text-gray-700 mb-1 flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
            <EyeIcon />
            Course Name
          </label>
          <select
            value={academicData.course}
            onChange={(e) => handleAcademicChange('course', e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B30738] focus:outline-none mt-1 text-sm sm:text-base"
          >
            <option value="">Choose Your Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className=" w-full text-xs sm:text-sm md:text-base font-bold text-gray-700 mb-1 flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
            <EyeIcon />
            Year of Studying
          </label>
          <select
            value={academicData.year}
            onChange={(e) => handleAcademicChange('year', e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B30738] focus:outline-none mt-1 text-sm sm:text-base"
          >
            <option value="">Year of Studying</option>
            <option value="1st Year">1</option>
            <option value="2nd Year">2</option>
            <option value="3rd Year">3</option>
            <option value="4th Year">4</option>
          </select>
        </div>
      </div>

    </>
  );
}
