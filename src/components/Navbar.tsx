import useHomePage from "../hooks/useHomePage";
import { LinkComponent } from "../utils/links";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { dispatch, state, HOMEPAGE_REDUCER_ACTIONS } = useHomePage();

  const onOpenNavbar = () => {
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.OPEN_SIDEBAR });
  };

  const onCloseNavbar = () => {
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.CLOSE_SIDEBAR });
  };

  return (
    <div className="w-[100%] shadow-lg h-[70px] md:px-8 px-4">
      <div className="container max-w-screen-xl mx-auto h-full flex items-center justify-between">
        <h2 className="text-4xl font-bold">Meal dB</h2>
        <div className="md:block hidden">
          <LinkComponent classlink={"navbar"} />
        </div>
        <div className="md:hidden block">
          <button type="button" onClick={onOpenNavbar}>
            <HiMenuAlt3 className="fill-fuchsia-500 text-2xl" />
          </button>
        </div>
      </div>
      <div
        className={`transition-transform fixed top-0 left-0 h-full w-full z-10 bg-white ${
          state.isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-[100%] h-[70px] shadow-lg px-4">
          <div className="w-full h-full flex items-center justify-between">
            <h2 className="text-4xl font-bold">Meal dB</h2>
            <button type="button" onClick={onCloseNavbar}>
              <AiOutlineClose className="fill-fuchsia-500 text-2xl" />
            </button>
          </div>
        </div>
        <LinkComponent classlink={"sidebar"} />
      </div>
    </div>
  );
};

export default Navbar;
