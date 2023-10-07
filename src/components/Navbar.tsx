import { LinkComponent } from "../utils/links";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="w-[100%] shadow-lg h-[70px] md:px-8 px-4">
      <div className="container mx-auto h-full flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold">Meal dB</h2>
        </div>
        <LinkComponent />
        <div className="md:hidden block">
          <HiMenuAlt3 className="fill-fuchsia-500 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
