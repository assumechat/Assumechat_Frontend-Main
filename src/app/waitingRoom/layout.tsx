'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { initSockets, joinQueue, leaveQueue } from '@/store/slices/socketSlice';
import { useRouter } from 'next/navigation';

export default function WaitingRoomLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const matched = useAppSelector(s => s.socket.matched);
    const user = useAppSelector((state) => state.user.user);
    useEffect(() => {
        if (!user?._id) {
            router.push("/")
        }
    }, [user])
    // on mount: connect & join
    useEffect(() => {
        dispatch(initSockets());
        dispatch(joinQueue());
        return () => { dispatch(leaveQueue()); };
    }, [dispatch]);

    // when matched arrives, redirect into the chat tab
    useEffect(() => {
        if (matched) {
            // you can pass roomId & peer via query params or context
            router.push(`/waitingRoom/tabs/assumer`);
        }
    }, [matched, router]);

    return <>{children}</>;
}
/*




*/