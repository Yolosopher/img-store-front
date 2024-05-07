import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/docs"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Docs
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
