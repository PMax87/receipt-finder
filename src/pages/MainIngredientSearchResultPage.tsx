import React, { ChangeEvent, useEffect } from "react";
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
      payload: { mealFilterResult: value },
    });
  };

  useEffect(() => {
    fetchSearchedMealFromIngredient();
    dispatch({
      type: HOMEPAGE_REDUCER_ACTIONS.FILTER_RESULT_BY_USER,
      payload: { mealFilterResult: "" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl pt-5">
        <h3 className="text-xl">
          La ricerca per l'ingrediente{" "}
          <span className="font-semibold">{strIngredient}</span> ha prodotto{" "}
          {state.receivedMeals.length} risultati
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className=""
            type="text"
            placeholder="Filter the result"
            value={state.mealFilterResult}
            onChange={onFilterResults}
          />
        </form>
      </div>
      <SearchedMeals />
    </>
  );
};

export default MainIngredientSearchPage;
