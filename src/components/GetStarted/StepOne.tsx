import React, { useState, useEffect } from 'react';
import { usColleges, commonCourses } from '@/Data/usColleges';

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
    {/* ... keep the same icon SVG ... */}
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* ... keep the same icon SVG ... */}
  </svg>
);

export default function StepOne({ academicData, handleAcademicChange }: StepOneProps) {
  const [availableCourses, setAvailableCourses] = useState<string[]>(commonCourses);
  const [filteredColleges, setFilteredColleges] = useState(usColleges);

  // When university changes, update available courses
  useEffect(() => {
    if (academicData.university) {
      const selectedCollege = usColleges.find(college => college.name === academicData.university);
      if (selectedCollege) {
        // Combine college-specific courses with common courses, remove duplicates
        const combinedCourses = [...new Set([...selectedCollege.popularCourses, ...commonCourses])];
        setAvailableCourses(combinedCourses);
      } else {
        setAvailableCourses(commonCourses);
      }
    } else {
      setAvailableCourses(commonCourses);
    }
  }, [academicData.university]);

  // Filter colleges based on search input
  const handleCollegeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = usColleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm) ||
      college.state.toLowerCase().includes(searchTerm)
    );
    setFilteredColleges(filtered);
  };

  return (
    <>
      <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <h1 className="font-geist text-xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-gray-900">
          Tell Us About Your Academic Journey
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          We're building a space where students can connect meaningfully. A little about your
          education helps us do that better. Don't worry, your details won't be shared publicly.
        </p>

        {/* University */}
        <div>
          <label className="w-full text-xs sm:text-sm md:text-base font-bold text-gray-700 mb-1 flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
            <GraduationCapIcon />
            University Name
          </label>

          <select
            value={academicData.university}
            onChange={(e) => handleAcademicChange('university', e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B30738] focus:outline-none mt-1 text-sm sm:text-base"
          >
            <option value="">Select Your University</option>
            {filteredColleges.map((college, index) => (
              <option key={index} value={college.name}>
                {college.name} ({college.state})
              </option>
            ))}
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
            <option value="">Select Your Course</option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="w-full text-xs sm:text-sm md:text-base font-bold text-gray-700 mb-1 flex flex-col sm:flex-row items-start sm:items-center mt-3 sm:mt-5 md:mt-6 gap-1 sm:gap-2">
            <EyeIcon />
            Year of Study
          </label>
          <select
            value={academicData.year}
            onChange={(e) => handleAcademicChange('year', e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B30738] focus:outline-none mt-1 text-sm sm:text-base"
          >
            <option value="">Select Year of Study</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Graduate Student">Graduate Student</option>
          </select>
        </div>
      </div>
    </>
  );
}