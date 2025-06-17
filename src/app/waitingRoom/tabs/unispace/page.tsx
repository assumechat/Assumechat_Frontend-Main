// app/cards/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import BurstStatus from '@/types/BurstStatus';

type CardData = {
    id: string;
    quote: string;
    author: string;
    stars: number;
    x: number;
    y: number;
    isBurst: BurstStatus; 
};


export default function CardsPage() {
    const [cards, setCards] = useState<CardData[]>([]);
    const user=useAppSelector((state)=> state.user.accessToken);
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const router = useRouter();

    useEffect(()=>{
        if(!isAuthenticated) {
            router.push('/');
            toast.error('User not found ,Please Sigin again',{
                duration: 2000,
            })
        }
    },[isAuthenticated]);

    //fetch feedbacks
    useEffect(()=>{
        const  fetchAllFeedbacks= async()=>{
         try{
            if(!user) return;
            console.log(user);
            const res= await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/get-feedback` , {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            })
            const data= await res.data;
            console.log(data);
            if(data.success && Array.isArray(data.data))
            {
                // size of our “canvas”
                const canvasWidth = 1000;
                const canvasHeight = 1000;
               // approximate card size (for edge padding)
                const cardW = 240;
                const cardH = 160;

                const mapCards=data.data
                .slice(0, 30) //latest 30
                .map((item:any , index: number)=> ({
                    id:item._id,
                    quote: item.comment,
                    stars:item.rating,
                    isBurst: item.isBurst === 'true' ? BurstStatus.TRUE : BurstStatus.FALSE,
                    x: Math.random()*(canvasWidth - cardW),
                    y: Math.random()*(canvasHeight - cardH),
                }));
                setCards(mapCards);
            }
        }
         catch(error: any){
            console.log("Error fetching cards:" , error);
        }
      };
        fetchAllFeedbacks();
    },[user]);

    //handle burst
    const handleBurst= async (cardId: string)=>{
        const id=cardId;
        console.log(id);
        try{
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}feedback/burst-feedback` ,{
                id: cardId,
            },
        {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
            //updatd state
            setCards((prevCards)=>
                prevCards.map((card) => 
                card.id ===cardId ? { ...card , isBurst: BurstStatus.TRUE} : card)
            )
        }
        catch(err: any){
            console.log("Error bursting assumption" , err);
        }
    };

    return (
        <div className="w-screen h-screen">
            <TransformWrapper
                initialScale={1}
                wheel={{ step: 0.2 }}
                pinch={{ step: 5 }}
                doubleClick={{ disabled: true }}
                minScale={0.5}
                maxScale={3}
            >
                {() => (
                    <TransformComponent
                        wrapperStyle={{
                            width: '100%',
                            height: '100%',
                            touchAction: 'none',
                        }}

                    >
                        {/* Big relative container */}
                        <div
                            className="relative"
                            style={{ width: 2000, height: 2000 }}
                        >
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className={`absolute flex flex-col justify-between border border-black p-4 rounded-lg shadow-lg transition-all duration-300 ${
                                    card.isBurst === BurstStatus.TRUE
                                    ? 'bg-gray-300 opacity-30 blur-[2px] pointer-events-none'
                                    : 'bg-white bg-opacity-80 backdrop-blur-md'
                                    }`}
                                    style={{
                                        width: 240,
                                        // note: w-60 ≈ 240px
                                        left: card.x,
                                        top: card.y,
                                    }}
                                >
                                    {/* quote icon */}
                                    <div className="mr-2">
                                        <svg
                                            width="11"
                                            height="8"
                                            viewBox="0 0 11 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.91016 0.74542V4.84053C5.91077 5.43275 6.1463 6.00054 6.56507 6.41931C6.98384 6.83808 7.55163 7.07361 8.14385 7.07422C8.24259 7.07422 8.33728 7.035 8.4071 6.96519C8.47691 6.89537 8.51613 6.80068 8.51613 6.70194C8.51613 6.60321 8.47691 6.50851 8.4071 6.4387C8.33728 6.36888 8.24259 6.32966 8.14385 6.32966C7.74891 6.32966 7.37014 6.17277 7.09088 5.8935C6.81161 5.61424 6.65472 5.23547 6.65472 4.84053V4.46825H9.44684C9.64431 4.46825 9.8337 4.3898 9.97333 4.25017C10.113 4.11053 10.1914 3.92115 10.1914 3.72368V0.74542C10.1914 0.547949 10.113 0.358566 9.97333 0.218933C9.8337 0.0792995 9.64431 0.000854492 9.44684 0.000854492H6.65472C6.45725 0.000854492 6.26787 0.0792995 6.12823 0.218933C5.9886 0.358566 5.91016 0.547949 5.91016 0.74542ZM1.25662 0.000854492H4.04874C4.24621 0.000854492 4.4356 0.0792995 4.57523 0.218933C4.71486 0.358566 4.79331 0.547949 4.79331 0.74542V3.72368C4.79331 3.92115 4.71486 4.11053 4.57523 4.25017C4.4356 4.3898 4.24621 4.46825 4.04874 4.46825H1.25662V4.84053C1.25662 5.23547 1.41351 5.61424 1.69278 5.8935C1.97205 6.17277 2.35081 6.32966 2.74575 6.32966C2.84449 6.32966 2.93918 6.36888 3.009 6.4387C3.07881 6.50851 3.11804 6.60321 3.11804 6.70194C3.11804 6.80068 3.07881 6.89537 3.009 6.96519C2.93918 7.035 2.84449 7.07422 2.74575 7.07422C2.15353 7.07361 1.58574 6.83808 1.16697 6.41931C0.748207 6.00054 0.512674 5.43275 0.512058 4.84053V0.74542C0.512058 0.547949 0.590503 0.358566 0.730136 0.218933C0.869769 0.0792995 1.05915 0.000854492 1.25662 0.000854492Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <p className="text-black font-bold text-md mt-1">
                                            {card.quote}
                                        </p>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {card.author}
                                        </p>
                                        <div className="flex justify-end p-1 items-center">
                                            {Array(card.stars)
                                                .fill(0)
                                                .map((_, idx) => (
                                                    <svg
                                                        key={idx}
                                                        width="11"
                                                        height="11"
                                                        viewBox="0 0 11 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0)">
                                                            <path
                                                                d="M5.22363 1.70947C5.30013 1.70947 5.37491 1.73236 5.43848 1.7749C5.48619 1.8069 5.52649 1.84901 5.55566 1.89795L5.58105 1.94873V1.94971L6.46387 4.08545L6.52148 4.22607L6.67285 4.23877L8.96094 4.42334V4.42236C9.03709 4.429 9.11002 4.45883 9.16992 4.50635C9.22978 4.55398 9.27418 4.61818 9.29785 4.69092C9.32156 4.76395 9.32339 4.84255 9.30273 4.9165C9.28208 4.99046 9.23976 5.05675 9.18164 5.10693L8.5127 5.68506V5.68408L7.43945 6.61182L7.3252 6.71045L7.36035 6.85693L7.8916 9.10889V9.10986C7.90947 9.18432 7.90535 9.26261 7.87891 9.33447C7.85242 9.40631 7.80505 9.46908 7.74316 9.51416C7.68118 9.55924 7.60686 9.5853 7.53027 9.58838C7.45377 9.59145 7.37785 9.57162 7.3125 9.53174H7.31348L5.35449 8.32666L5.22461 8.24658L5.09473 8.32666L3.13574 9.53076C3.07048 9.57036 2.99522 9.59052 2.91895 9.5874C2.84248 9.58422 2.76792 9.55824 2.70605 9.51318C2.64432 9.46815 2.59775 9.40519 2.57129 9.3335C2.55143 9.27957 2.54381 9.22231 2.54883 9.16553L2.55762 9.10986V9.10889L3.09082 6.85693L3.12598 6.71045L3.01172 6.61182L1.2666 5.10596H1.26562C1.20819 5.05595 1.16701 4.98986 1.14648 4.9165C1.12588 4.84286 1.12699 4.76469 1.15039 4.69189C1.17396 4.61895 1.21936 4.55413 1.2793 4.50635C1.33854 4.45919 1.41 4.42948 1.48535 4.42236L1.48633 4.42334L3.77441 4.23877L3.92578 4.22607L3.9834 4.08545L4.86621 1.94971V1.94873C4.89532 1.87802 4.94527 1.81749 5.00879 1.7749C5.07236 1.73234 5.14713 1.70948 5.22363 1.70947Z"
                                                                fill="#FFD369"
                                                                stroke="#D8AD00"
                                                                strokeWidth="0.5"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect
                                                                    width="9.92754"
                                                                    height="9.92754"
                                                                    fill="white"
                                                                    transform="translate(0.26 0.84)"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                ))}
                                        </div>
                                    </div>
                                    {/*only show burst button if it is not already bursted*/}
                                    {card.isBurst===BurstStatus.FALSE && (
                                        <button onClick={()=>handleBurst(card.id)}
                                        className="mt-2 bg-[#B30738]  text-white px-3 py-1 rounded hover:bg-[#B30738] transition">
                                            Burst this Assumption
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TransformComponent>
                )}
            </TransformWrapper>
        </div>
    );
}
