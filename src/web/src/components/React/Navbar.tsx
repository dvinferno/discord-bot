import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

import LinkButton from "./LinkButton";
import ProfileButton from "./ProfileButton";

import { FaBars, FaTimes } from "react-icons/fa";
import { DocIcon } from "../Icons/DocIcon";
import { DashIcon } from "../Icons/DashIcon";

function Logo() {
  return (
    <div>
      <a href="/">
        <img src="../../src/assets/icon.png" className="h-12" alt="Bot Logo" />
      </a>
    </div>
  );
}

type NavButtonProps = {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ElementType;
  onClick?: () => void;
  className?: string;
  label?: string;
};

function NavButton({
  icon: Icon,
  onClick,
  className = "",
  label,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center cursor-pointer gap-2 p-2 hover:bg-white/10 rounded-sm transition ${className}`}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {label && <span>{label}</span>}
    </button>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  console.log("User:", user);

  const getDiscordAvatar = (user: {
    avatar: string;
    discriminator: string;
    id: any;
  }) => {
    if (!user.avatar) {
      // Return default avatar if user has none
      const defaultAvatarIndex = parseInt(user.discriminator) % 5;
      return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }

    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`;
  };

  const showNavbar = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  return (
    <>
      <header className="fixed flex items-center justify-between h-16 px-2 w-full">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          <NavButton className="text-sm" icon={DashIcon} label="Dashboard" />
          <NavButton className="text-sm" icon={DocIcon} label="Documentation" />

          {user ? (
            <ProfileButton
              label={user.global_name}
              avatarUrl={getDiscordAvatar(user)}
            />
          ) : (
            <LinkButton
              text="Login"
              redirectUri="http://localhost:3002/auth/discord"
              className="bg-indigo-600 hover:bg-indigo-700/80"
            />
          )}
        </nav>

        {/* Mobile Toggle */}
        <NavButton
          className="md:hidden text-white"
          onClick={showNavbar}
          icon={isOpen ? FaTimes : FaBars}
        ></NavButton>
      </header>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full z-0 overflow-hidden transition-all duration-300 ease-in-out transform bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 ${
          isOpen
            ? "max-h-60 opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-0"
        } origin-top`}
      >
        <div className="flex flex-col gap-4 p-4">
          {user ? (
            <ProfileButton
              label={user.global_name}
              avatarUrl={getDiscordAvatar(user)}
            />
          ) : (
            <LinkButton
              text="Login"
              redirectUri="http://localhost:3002/auth/discord"
              className="bg-indigo-600 hover:bg-indigo-700/80"
            />
          )}
          <NavButton icon={DashIcon} label="Dashboard" />
          <NavButton icon={DocIcon} label="Documentation" />
        </div>
      </div>
    </>
  );
}
