import { ChangeEvent, useEffect } from "react";
import useHomePage from "../hooks/useHomePage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetMealsApiResponse } from "../context/HomePageContext";
import { SearchedMeals } from "../components";
const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

const MainIngredientSearchPage = () => {
  const { state, dispatch, HOMEPAGE_REDUCER_ACTIONS } = useHomePage();
  const { strIngredient } = useParams();

  const fetchSearchedMealFromIngredient = async () => {
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.IS_LOADING_SEARCHED_MEALS });
    try {
      const response = await axios.get<GetMealsApiResponse>(
        url + strIngredient
      );
      const data = response.data.meals;
      dispatch({
        type: HOMEPAGE_REDUCER_ACTIONS.MEALS_FETCHING_SUCCCESS,
        payload: { meals: data },
      });
    } catch (error) {
      dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.IS_ERROR_SEARCHED_MEALS });
    }
  };

  const onFilterResults = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch({
      type: HOMEPAGE_REDUCER_ACTIONS.FILTER_RESULT_BY_USER,
      payload: { mealsFilterInput: value },
    });
  };

  useEffect(() => {
    fetchSearchedMealFromIngredient();
    dispatch({
      type: HOMEPAGE_REDUCER_ACTIONS.FILTER_RESULT_BY_USER,
      payload: { mealsFilterInput: "" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl pt-5 px-4 lg:px-0">
        <h3 className="text-xl">
          La ricerca per l'ingrediente{" "}
          <span className="font-semibold capitalize">{strIngredient}</span> ha
          prodotto {state.filteredMeals.length} risultati
        </h3>
        <form
          className="flex-wrap items-center mt-4 lg:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="me-2 text-2xl w-full lg:w-auto">
            Filtra i risultati
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-300 outline-fuchsia-600 focus:border-fuchsia-500 block p-2.5 lg:w-60 me-4 w-full my-3"
            type="text"
            value={state.mealsFilterInput}
            onChange={onFilterResults}
          />
        </form>
      </div>
      <SearchedMeals />
    </>
  );
};

export default MainIngredientSearchPage;
