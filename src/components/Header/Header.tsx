"use client";
import { UserState } from "@/types/userstate";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/lib/logout";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

// Import reusable components
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import ActionButtons from "./ActionButton";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state: { user: UserState }) => state.user.user);
  const isAuthenticated = useSelector(
    (state: { user: UserState }) => state.user.isAuthenticated
  );

  const router = useRouter();
  const dispatch = useDispatch();

  // Check if user is currently in waiting room
  const isInWaitingRoom = pathname === "/waitingRoom";

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    router.push("/");
  };

  const handleExplore = () => {
    if (isAuthenticated) {
      router.push("/waitingRoom");
    } else {
      router.push("/signin");
    }
  };

  // Navigation data
  const featureItems = [{ label: "ComingSoon", href: "/ComingSoon" }];

  const howItWorksItems = [{ label: "ComingSoon", href: "/ComingSoon" }];

  const aboutUsItems = [
    { label: "Team", href: "/OurTeam" },
    { label: "Careers", href: "/ComingSoon" },
    { label: "Mission", href: "/ComingSoon" },
    { label: "Contact", href: "/Request" },
    { label: "Feedback", href: "/Request" },
    { label: "Report Bug", href: "/Request" },
  ];

  const navigationGroups = [
    { label: "How it works?", items: howItWorksItems },
    { label: "Features", items: featureItems },
    { label: "About Us", items: aboutUsItems },
  ];

  return (
    <>
      <header className="w-full fixed px-4 lg:px-20 py-4 flex items-center justify-between border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-[2px] z-50">
        <Logo />

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <DesktopNavigation
          isAuthenticated={isAuthenticated}
          navigationGroups={navigationGroups}
        />

        <ActionButtons
          isAuthenticated={isAuthenticated}
          isInWaitingRoom={isInWaitingRoom}
          user={user}
          onExplore={handleExplore}
          onLogout={handleLogout}
        />
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileNavigation
          isAuthenticated={isAuthenticated}
          navigationGroups={navigationGroups}
          user={user}
          isInWaitingRoom={isInWaitingRoom}
          onMenuClose={() => setIsMenuOpen(false)}
          onExplore={handleExplore}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
