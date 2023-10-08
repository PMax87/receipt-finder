import { Hero } from "../components";
import useHomePage from "../hooks/useHomePage";
import HeroImage from "../images/koreanbeefmealprep-750x1000.webp";
import { AiOutlineSearch } from "react-icons/ai";

const HomePage = () => {
  const { state, dispatch, HOMEPAGE_REDUCER_ACTIONS } = useHomePage();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  const onChangeInput = (e: HTMLInputElement) => {
    const { value } = e.targe.value;
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.SEARCH_BY_USER, payload: value });
    console.log(value);
  };

  return (
    <>
      <Hero>
        <div className="container mx-auto max-w-screen-xl mt-24">
          <div className=" flex flex-col lg:grid grid-cols-2 content-center">
            <div className="content-center">
              <h2 className="lg:text-7xl lg:text-left lg:mt-0 tracking-wide text-5xl font-bold text-center">
                Cerca!
              </h2>
              <h3 className="lg:text-7xl lg:text-left lg:mt-0 tracking-wide text-5xl font-bold text-center mt-1">
                Cucina!!
              </h3>
              <h3 className="lg:text-7xl lg:text-left lg:mt-0 tracking-wide text-5xl font-bold text-center mt-1">
                Gusta!!!!
              </h3>
              <div className="mt-8">
                <p className="lg:w-1/2 lg:text-left leading-relaxed text-center">
                  Scorri in basso per <br /> cercare la tua ricetta preferita
                </p>
              </div>
            </div>
            <div className="lg:grid w-full">
              <img
                src={HeroImage}
                alt="Hero Image"
                className="lg:rounded-lg lg:w-3/4 justify-self-end w-full"
              />
            </div>
          </div>
        </div>
      </Hero>
      <div className="w-[100%] mt-8 md:px-8 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <form onSubmit={onSubmitForm} className="flex items-center">
              <label className="text-2xl font-semibold me-7">
                Cerca il tuo drink
              </label>
              <input
                type="text"
                placeholder={state.searchFilter}
                value={state.searchFilter}
                onChange={onChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button type="submit">
                <AiOutlineSearch className="fill-fuchsia-500 text-2xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
