import Link from "next/link";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  name?: string;
  email?: string;
  profilePicture?: string;
}

interface ProfileDropdownProps {
  user: User | null;
  onLogout: () => void;
}

export default function ProfileDropdown({
  user,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full bg-gradient-to-tr from-[#B30738] to-[#ff6f98] flex items-center justify-center shadow-md hover:scale-105 transition-transform focus:outline-none">
          <span className="absolute inset-0 rounded-full border-2 border-white opacity-60"></span>
          <User className="h-5 w-5 text-white z-10" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link className="w-full" href={"/ComingSoon"}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/Request">
            Feature Request
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/Request">
            Bug Report
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Link className="w-full" href={"/"}>
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
