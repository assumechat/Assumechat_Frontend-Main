import React from "react";
import Testimonial from "@/types/Testimonials";
import testimonialsData from "@/Data/Testimonials";
import Image from "next/image";
export default function TestimonialsSection() {
  // Helper to render stars
  const renderStars = (rating: number) =>
    Array.from({ length: rating }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-yellow-500 inline-block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.363 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.371-2.454a1 1 0 00-1.176 0l-3.37 2.454c-.784.57-1.838-.197-1.539-1.118l1.285-3.953a1 1 0 00-.364-1.118L2.171 8.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.955z" />
      </svg>
    ));

  // Function to generate rows based on slice
  const row = (items: Testimonial[]) => (
    <div className="grid gird-cols-1 md:grid-cols-2 gap-6 mb-6">
      {items.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white border border-[#616161] bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
              {testimonial.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            {/* testimonial.img ? (
              <Image
                width={100}
                height={100}
                src={testimonial.img}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-contain mr-4"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                {testimonial.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )*/}
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-600">{testimonial.title}</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700 flex-1">{testimonial.content}</p>

          <div className="mt-4 flex justify-end">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        What Students Say About Us
      </h2>

      {/* Description */}
      <p className="text-md md:text-xl text-center text-[#616161] font-semibold max-w-3xl mx-auto mb-8 md:mb-12">
        Don’t Take It From Us — Take It From the Ones Who Assumed.
      </p>

      {/* Centered blurred gradient circle */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-1/2 h-96 bg-gradient-to-br from-[#fafaf9] via-[#C18496] to-[#fafaf9] rounded-full filter blur-xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: first 2 */}
        {row(testimonialsData.slice(0, 2))}
        {/* Middle row: next 3 */}
        <div className="grid gird-cols-1 md:grid-cols-3 gap-6 mb-6">
          {testimonialsData.slice(2, 5).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white  border border-[#616161] bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700 flex-1">{testimonial.content}</p>

              <div className="mt-4 flex justify-end">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
        {/* Bottom row: last 2 */}
        {row(testimonialsData.slice(5, 7))}
      </div>
    </section>
  );
}
