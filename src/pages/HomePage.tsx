import { ChangeEvent, useEffect } from "react";
import { Hero } from "../components";
import useHomePage from "../hooks/useHomePage";
import HeroImage from "../images/koreanbeefmealprep-750x1000.webp";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { GetMealsApiResponse } from "../context/HomePageContext";

const HomePage = () => {
  const { state, dispatch, HOMEPAGE_REDUCER_ACTIONS } = useHomePage();

  const fetchData = async () => {
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.IS_LOADING_SEARCHED_MEALS });
    try {
      const response = await axios.get<GetMealsApiResponse>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${state.searchedFilter}`
      );
      const data = response.data?.meals;
      dispatch({
        type: HOMEPAGE_REDUCER_ACTIONS.MEALS_FETCHING_SUCCCESS,
        payload: { meals: data },
      });
    } catch (error) {
      dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.IS_ERROR_SEARCHED_MEALS });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({
      type: HOMEPAGE_REDUCER_ACTIONS.SEARCH_BY_USER,
      payload: { searchedFilter: value },
    });
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
      <div className="container lg:px-0 mx-auto max-w-screen-xl px-4 lg:mt-4">
        <form onSubmit={onSubmitForm} className="flex items-center">
          <label className="text-2xl font-semibold me-4">
            Cerca la tua ricetta:
          </label>
          <input
            type="text"
            name="userSearch"
            value={state.searchedFilter}
            onChange={onChangeInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-300 outline-fuchsia-600 focus:border-fuchsia-500 block p-2.5 w-60 me-4"
          />
          <button type="submit">
            <AiOutlineSearch className="fill-fuchsia-500 text-2xl" />
          </button>
          <p className="justify-self-end">
            {state.receivedMeals.length + " Risultati trovati"}
          </p>
        </form>
      </div>
      {state.receivedMeals.length < 1 ? (
        <div className="container lg:px-0 mx-auto max-w-screen-xl px-4 lg:mt-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-1/2"
            role="alert"
          >
            <span className="block sm:inline">Nessun ricetta trovata</span>
          </div>
        </div>
      ) : (
        <div>Ciao</div>
      )}
    </>
  );
};

export default HomePage;
