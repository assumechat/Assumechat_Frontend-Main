'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share2, MoreVertical } from 'lucide-react';

const ReelsSection = () => {
    const [reels] = useState([
        { id: 1, embedUrl: 'https://www.youtube.com/embed/ECpjj_4lMH4', username: '@campus_explorer', description: 'A day in the life of a CS student', likes: '1.2k', comments: '243' },
        { id: 2, embedUrl: 'https://www.youtube.com/embed/Nl_TfPCH7rQ', username: '@uni_foodie', description: 'Campus eats on a budget', likes: '2.9k', comments: '350' },
        { id: 3, embedUrl: 'https://www.youtube.com/embed/fR-G72zUy-k', username: '@study_with_me', description: 'Late-night studies', likes: '4.5k', comments: '784' },
        { id: 4, embedUrl: 'https://www.youtube.com/embed/Ol96Yuq24Eo', username: '@dormlife', description: 'Dorm room organization', likes: '3.1k', comments: '289' },
        { id: 5, embedUrl: 'https://www.youtube.com/embed/hK0WSc2GaQI', username: '@campus_style', description: 'Student fashion', likes: '2.7k', comments: '156' },
        { id: 6, embedUrl: 'https://www.youtube.com/embed/_Ugg89GGVZo', username: '@fitness_uni', description: 'Quick workouts', likes: '4.3k', comments: '400' },
        { id: 7, embedUrl: 'https://www.youtube.com/embed/PhzB6nfT2sA', username: '@uni_travel', description: 'Budget travel tips', likes: '5.2k', comments: '612' },
        { id: 8, embedUrl: 'https://www.youtube.com/embed/jbyUQ25Ah68', username: '@productivity_hacks', description: 'Study productivity hacks', likes: '6.1k', comments: '734' },
        { id: 9, embedUrl: 'https://www.youtube.com/embed/_EyMdoFE-jo', username: '@uni_social', description: 'Making friends', likes: '3.8k', comments: '481' },
        { id: 10, embedUrl: 'https://www.youtube.com/embed/ZDezYdUpD7U', username: '@campus_comedy', description: 'Funny campus moments', likes: '7.9k', comments: '923' },
    ]);

    return (
        <div className="flex mt-12 md:mt-28 justify-center w-full bg-white overflow-hidden">
            <div className="relative h-[85vh] px-4 w-full max-w-md overflow-y-auto snap-y snap-mandatory scrollbar-hide">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="h-[85vh] w-max mb-4 rounded-xl snap-start relative overflow-hidden bg-black"
                    >
                        {/* YouTube Shorts iframe embed */}
                        <iframe
                            src={reel.embedUrl}
                            title={`YouTube Shorts ${reel.id}`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReelsSection;
