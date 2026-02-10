"use client"
import React from 'react';
import Testimonial from '@/types/Testimonials';
import testimonialsData from '@/Data/Testimonials';
import Image from 'next/image';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
      <div>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-100">
            <Image
              width={48}
              height={48}
              src={testimonial.img}
              alt={testimonial.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold text-black leading-tight">{testimonial.name}</h4>
            <p className="text-xs text-gray-500 font-medium">{testimonial.title}</p>
          </div>
        </div>
        <p className="text-gray-700 text-[15px] leading-relaxed">
          {testimonial.content}
        </p>
      </div>

      <div className="mt-4 flex justify-end gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-[#FFD369]"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.363 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.371-2.454a1 1 0 00-1.176 0l-3.37 2.454c-.784.57-1.838-.197-1.539-1.118l1.285-3.953a1 1 0 00-.364-1.118L2.171 8.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.955z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-[#FCFBFB]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-4">
            What Students Say <span className="text-[#B30738]">About Us</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            Don&apos;t Take It From Us Take It From the Ones Who Assumed.
          </p>
        </div>

        {/* --- Grid Layout --- */}
        <div className="space-y-6">
          
          {/* Row 1: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialsData.slice(0, 2).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          {/* Row 2: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.slice(2, 5).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          {/* Row 3: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonialsData.slice(5, 7).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}