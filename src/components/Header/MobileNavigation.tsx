import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { User } from "lucide-react";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

interface User {
  name?: string;
  email?: string;
  profilePicture?: string;
}

interface MobileNavigationProps {
  isAuthenticated: boolean;
  navigationGroups: NavigationGroup[];
  user: User | null;
  isInWaitingRoom: boolean;
  onMenuClose: () => void;
  onExplore: () => void;
  onLogout: () => void;
}

export default function MobileNavigation({
  isAuthenticated,
  navigationGroups,
  user,
  isInWaitingRoom,
  onMenuClose,
  onExplore,
  onLogout,
}: MobileNavigationProps) {
  const [showFeatureMobile, setShowFeatureMobile] = useState(false);
  const [showHowItWorksMobile, setShowHowItWorksMobile] = useState(false);
  const [showAboutUsMobile, setShowAboutUsMobile] = useState(false);

  const stateMap = {
    "How it works?": {
      show: showHowItWorksMobile,
      setShow: setShowHowItWorksMobile,
    },
    Features: { show: showFeatureMobile, setShow: setShowFeatureMobile },
    "About Us": { show: showAboutUsMobile, setShow: setShowAboutUsMobile },
  };

  return (
    <div className="fixed top-16 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg z-40 md:hidden border-b border-gray-200">
      <nav className="flex flex-col p-4 space-y-4">
        {!isAuthenticated && (
          <>
            {navigationGroups.map(({ label, items }) => {
              const state = stateMap[label as keyof typeof stateMap];
              if (!state) return null;

              const { show, setShow } = state;

              return (
                <div key={label}>
                  <button
                    onClick={() => setShow(!show)}
                    className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:text-[#B30738]"
                  >
                    {label}
                    <span>{show ? "-" : "+"}</span>
                  </button>
                  {show && (
                    <div className="pl-6">
                      {items.map(({ label, href }) => (
                        <Link
                          key={label}
                          href={href}
                          className="block py-2 text-sm text-gray-700 hover:text-[#B30738]"
                          onClick={onMenuClose}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {isAuthenticated && (
          <>
            {/* Mobile Profile Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                  {user ? (
                    <User className="h-4 w-4 text-gray-600 m-auto mt-2" />
                  ) : (
                    <FiUser className="h-4 w-4 text-gray-600 m-auto mt-2" />
                  )}
                </div>
                <span className="text-sm text-gray-700">
                  {user?.name || "User"}
                </span>
              </div>
              <Link
                href="/ComingSoon"
                className="block py-2 px-4 text-gray-700 hover:text-[#B30738]"
                onClick={onMenuClose}
              >
                Profile
              </Link>
              <Link
                href="/Request"
                className="block py-2 px-4 text-gray-700 hover:text-[#B30738]"
                onClick={onMenuClose}
              >
                Feature Request
              </Link>
              <Link
                href="/Request"
                className="block py-2 px-4 text-gray-700 hover:text-[#B30738]"
                onClick={onMenuClose}
              >
                Bug Report
              </Link>
            </div>
          </>
        )}

        <div className="flex flex-col space-y-3 pt-2">
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3">
              {!isInWaitingRoom && (
                <button
                  onClick={() => {
                    onExplore();
                    onMenuClose();
                  }}
                  className="px-6 py-2 rounded-lg text-center bg-[#B30738] text-white hover:bg-[#95052c]"
                >
                  Explore
                </button>
              )}

              <button
                onClick={() => {
                  onLogout();
                  onMenuClose();
                }}
                className="px-6 py-2 border border-red-500 rounded-lg text-center bg-white text-red-600 hover:bg-red-50"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onExplore();
                onMenuClose();
              }}
              className="px-6 py-2 rounded-lg text-center bg-[#B30738] text-white hover:bg-[#95052c]"
            >
              Explore
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
