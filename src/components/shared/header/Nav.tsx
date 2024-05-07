import useAuth from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import authStore from "@/stores/authStore";
import { NavLink } from "react-router-dom";

const GuestNav = () => {
  return (
    <>
      <li>
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            cn("hover:underline", isActive ? "text-primary" : "")
          }
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/auth/register"
          className={({ isActive }) =>
            cn("hover:underline", isActive ? "text-primary" : "")
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );
};

const UserNav = () => {
  const { logout } = useAuth();

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn("hover:underline", isActive ? "text-primary" : "")
          }
        >
          Docs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tokens"
          className={({ isActive }) =>
            cn("hover:underline", isActive ? "text-primary" : "")
          }
        >
          Tokens
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn("hover:underline", isActive ? "text-primary" : "")
          }
        >
          Profile
        </NavLink>
      </li>
      <li>
        <span className="cursor-pointer hover:underline " onClick={logout}>
          Logout
        </span>
      </li>
    </>
  );
};

const Nav = () => {
  const authInfo = authStore((state) => state.authInfo);

  return (
    <nav>
      <ul className="flex space-x-4 items-center">
        {authInfo ? <UserNav /> : <GuestNav />}
      </ul>
    </nav>
  );
};
export default Nav;
