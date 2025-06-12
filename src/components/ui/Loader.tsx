import Image from 'next/image';
import React from 'react';

const GlassBlurLoader = () => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-[9999]"
            role="status"
            aria-label="Loading"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-gray-100/40 backdrop-blur-sm" />

            <div className="relative rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="https://res.cloudinary.com/dipywb0lr/image/upload/v1749293538/GreenAndYellowVibrantBuy2Get1FreeInstagramPost-ezgif.com-gif-maker_cp370v.gif"
                        alt="Loading indicator"
                        width={100}
                        height={100}
                        unoptimized
                        priority
                        className="h-16 w-16 sm:h-24 sm:w-24"
                    />
                </div>
            </div>
        </div>
    );
};

export default GlassBlurLoader;
