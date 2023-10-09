import { useParams } from "react-router-dom";
const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
import axios from "axios";
import { useEffect } from "react";
import useSingleMeal from "../hooks/useSingleMeal";
import { GetMealApiResponse } from "../context/SingleReceipContext";
import { ApiResponse } from "../context/HomePageContext";

const SingleMeal = () => {
  const { dispatch, state, SINGLE_MEAL_REDUCER_ACTIONS } = useSingleMeal();
  const { idMeal } = useParams();

  const fetchSingleMeal = async () => {
    dispatch({
      type: SINGLE_MEAL_REDUCER_ACTIONS.IS_LOADING_SEARCHED_MEAL,
    });
    try {
      const response = await axios.get<GetMealApiResponse>(url + idMeal);
      const data = response.data.meals;
      console.log(data);
      dispatch({
        type: SINGLE_MEAL_REDUCER_ACTIONS.MEAL_FETCHING_SUCCCESS,
        payload: { meals: data },
      });
    } catch (error) {
      dispatch({
        type: SINGLE_MEAL_REDUCER_ACTIONS.IS_ERROR_SEARCHED_MEAL,
      });
    }
  };

  useEffect(() => {
    fetchSingleMeal();
  }, []);

  return (
    <div>{state.isLoading ? <div>Loading</div> : <div>Prodotto</div>}</div>
  );
};

export default SingleMeal;
