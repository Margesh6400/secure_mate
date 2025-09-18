export interface NavLink {
  name: string;
  href: string;
}

export interface NavigationProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  onNavLinkClick: () => void;
}
