import NavigationDropdown from "./NavigationDropdown";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

interface DesktopNavigationProps {
  isAuthenticated: boolean;
  navigationGroups: NavigationGroup[];
}

export default function DesktopNavigation({
  isAuthenticated,
  navigationGroups,
}: DesktopNavigationProps) {
  if (!isAuthenticated) {
    return (
      <nav className="hidden md:flex font-medium space-x-14 text-md">
        {navigationGroups.map(({ label, items }) => (
          <NavigationDropdown key={label} label={label} items={items} />
        ))}
      </nav>
    );
  }

  return <nav className="hidden md:flex font-medium space-x-14 text-md"></nav>;
}
