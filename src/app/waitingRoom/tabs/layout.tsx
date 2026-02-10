// app/waiting-room/layout.tsx
import Sidebar from "@/components/Sidebar/Sidebar";

export default function WaitingRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar Children={children} />
    </div>
  );
}
