import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationDropdownProps {
  label: string;
  items: NavigationItem[];
}

export default function NavigationDropdown({
  label,
  items,
}: NavigationDropdownProps) {
  const pathname = usePathname();

  return (
    <div className="relative group">
      <span
        className={`py-2 cursor-pointer ${
          pathname === "/ComingSoon"
            ? "text-[#B30738] border-b-2 border-[#B30738]"
            : "text-gray-700 hover:text-[#B30738]"
        } transition`}
      >
        {label}
      </span>
      <div className="absolute top-full left-0 w-48 mt-2 bg-white shadow-md border border-gray-100 rounded-lg hidden group-hover:block z-50">
        {items.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#B30738]"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
