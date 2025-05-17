'use client'

import Image from "next/image";

const logos = [
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489121/image_3_nmsm3m.png", alt: "Santa Clara University" },
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489121/image_2_gseqco.png", alt: "Yale University" },
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489121/image_4_nfzjlj.png", alt: "University of Massachusetts" },
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489121/image_6_ycetpk.png", alt: "Stanford University" },
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489121/image_7_k5xmfp.png", alt: "Brown University" },
  { src: "https://res.cloudinary.com/dipywb0lr/image/upload/v1747489120/image_5_rxkb4n.png", alt: "Columbia University" },
];

export default function StepThree({

}){
    return (
    <div className="text-center py-10 mt-18 mb-6">
       <h1 className="font-sans font-bold  text-2xl md:text-4xl  leading-[125%] tracking-normal text-center text-black mb-6 ]"
            >Connecting Students</h1>
        <h2 className="font-sans font-semibold text-md md:text-xl leading-[125%] tracking-normal text-center text-gray-500 mb-6 ml-4 mr-4">
            Trusted and used by students from universities across the country.
        </h2>
        <div className="ml-10 mr-10 grid grid-cols-3 md:gap-x-0.1 sm:grid-cols-6 gap-x-0.5 gap-y-4 sm:gap-y-2 mt-2 justify-items-center">
            {logos.map((logo, index) => (
            <div key={index} className=" mt-6 md:w-[120px] md:h-[120px] sm:w-[10px] sm:h-[10px] flex items-center justify-center">
            <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={200}
                className="object-contain w-full h-full"
            />
            </div>
            ))}
        </div>
    </div>
  );
}