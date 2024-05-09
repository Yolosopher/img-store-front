import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import authStore from "@/stores/authStore";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import OutsideClick from "../outside-click/OutsideClick";
import useMediaQuery from "@/hooks/media-query/useMediaQuery";
import { Role } from "@/types";

interface NavLiProps extends React.HTMLAttributes<HTMLLIElement> {
  to: string;
  pageName: string;
}

const NavLi = ({ to, pageName, ...args }: NavLiProps) => {
  return (
    <li
      className="border-b-[1px] pb-[3px] border-bottom border-primary md:border-none md:pb-0 hover:text-primary/70 transition-all"
      {...args}
    >
      <NavLink
        to={to}
        end
        className={({ isActive }) => cn(isActive ? "text-primary" : "")}
      >
        {pageName}
      </NavLink>
    </li>
  );
};

const GuestNav = () => {
  return (
    <>
      <NavLi to="/auth/login" pageName="Login" />
      <NavLi to="/auth/register" pageName="Register" />
    </>
  );
};
const AdminNav = () => {
  return (
    <>
      <NavLi to="/admin/dashboard" pageName="Dashboard" />
      <NavLi to="/admin/users" pageName="Users" />
    </>
  );
};
const UserNav = () => {
  const { logout } = useAuth();

  return (
    <>
      <NavLi to="/tokens" pageName="Tokens" />
      <NavLi to="/images" pageName="Images" />
      <NavLi to="/profile" pageName="Profile" />
      <li className="border-b-[1px] pb-[3px] border-bottom border-primary md:border-none md:pb-0 hover:text-primary/70 transition-all">
        <span className="cursor-pointer" onClick={logout}>
          Logout
        </span>
      </li>
    </>
  );
};

const Nav = () => {
  const matches = useMediaQuery(768);
  const [burgerToggle, setBurgerToggle] = useState<boolean>(false);
  const authInfo = authStore((state) => state.authInfo);
  const toggleBurgerMenu = () => {
    if (matches) return;
    setBurgerToggle((prev) => !prev);
  };
  const hideBurgerMenu = () => {
    if (matches) return;
    setBurgerToggle(false);
  };
  return (
    <OutsideClick
      as="nav"
      disableClick={!burgerToggle}
      onClose={hideBurgerMenu}
      className="md:static"
    >
      <Button
        type="button"
        onClick={toggleBurgerMenu}
        className="md:hidden"
        variant="secondary"
        size={"icon"}
      >
        <Menu />
      </Button>

      <ul
        className={cn(
          "w-48 md:w-[unset] absolute rounded-md bg-secondary p-5 md:p-0 md:bg-transparent flex-col gap-4 left-2 md:static md:flex-row flex md:items-center transition-all",
          !matches &&
            (burgerToggle
              ? "translate-x-0  opacity-100"
              : "-translate-x-[120%] opacity-0")
        )}
        style={{
          top: "calc(100% + .5rem)",
        }}
      >
        <NavLi to="/" pageName="Docs" />
        {authInfo?.role &&
          [Role.ADMIN, Role.SUPER_ADMIN].includes(authInfo.role) && (
            <AdminNav />
          )}
        {authInfo ? <UserNav /> : <GuestNav />}
      </ul>
    </OutsideClick>
  );
};
export default Nav;
