import ProfileDropdown from "./ProfileDropdown";

interface User {
  name?: string;
  email?: string;
  profilePicture?: string;
}

interface ActionButtonsProps {
  isAuthenticated: boolean;
  isInWaitingRoom: boolean;
  user: User | null;
  onExplore: () => void;
  onLogout: () => void;
}

export default function ActionButtons({
  isAuthenticated,
  isInWaitingRoom,
  user,
  onExplore,
  onLogout,
}: ActionButtonsProps) {
  return (
    <div className="hidden md:flex items-center space-x-2">
      {isAuthenticated ? (
        <div className="flex items-center gap-2 lg:gap-8">
          {!isInWaitingRoom && (
            <button
              onClick={onExplore}
              className="px-6 md:px-12 py-2 rounded-lg bg-[#B30738] text-white hover:bg-[#95052c] transition"
            >
              Explore
            </button>
          )}
          <ProfileDropdown user={user} onLogout={onLogout} />
        </div>
      ) : (
        <button
          onClick={onExplore}
          className="px-6 md:px-12 py-2 rounded-lg bg-[#B30738] text-white hover:bg-[#95052c] transition"
        >
          Explore
        </button>
      )}
    </div>
  );
}
