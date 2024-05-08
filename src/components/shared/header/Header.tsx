import { ModeToggle } from "@/components/mode-toggle";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-card shadow-xl">
      <div className="container flex h-28 md:justify-center items-center relative">
        <Nav />
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
