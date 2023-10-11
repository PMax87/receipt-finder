import React, { useEffect } from "react";
import useHomePage from "../hooks/useHomePage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetMealsApiResponse } from "../context/HomePageContext";
import { Meals, SearchedMeals } from "../components";
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
      console.log(data);
      dispatch({
        type: HOMEPAGE_REDUCER_ACTIONS.MEALS_FETCHING_SUCCCESS,
        payload: { meals: data },
      });
    } catch (error) {
      dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.IS_ERROR_SEARCHED_MEALS });
    }
  };

  useEffect(() => {
    fetchSearchedMealFromIngredient();
  }, []);

  return (
    <div>
      <SearchedMeals />
    </div>
  );
};

export default MainIngredientSearchPage;
