// app/waitingRoom/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initSockets, joinQueue, leaveQueue } from '@/store/slices/socketSlice';

export default function WaitingRoomLayout({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initSockets());
        dispatch(joinQueue());
        return () => {
            dispatch(leaveQueue());
        };
    }, [dispatch]);

    return <>{children}</>;
}
