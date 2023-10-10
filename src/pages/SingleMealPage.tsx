import { useParams } from "react-router-dom";
const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
import axios from "axios";
import { useEffect } from "react";
import useSingleMeal from "../hooks/useSingleMeal";
import { GetMealApiResponse } from "../context/SingleReceipContext";
import { Loading } from "../components";
import { SingleMeal } from "../components";

const SingleMealPage = () => {
  const { dispatch, state, SINGLE_MEAL_REDUCER_ACTIONS } = useSingleMeal();
  const { idMeal } = useParams();

  const fetchSingleMeal = async () => {
    dispatch({
      type: SINGLE_MEAL_REDUCER_ACTIONS.IS_LOADING_SEARCHED_MEAL,
    });
    try {
      const response = await axios.get<GetMealApiResponse>(url + idMeal);
      if (response.data.meals.length > 0) {
        const data = response.data.meals[0];
        dispatch({
          type: SINGLE_MEAL_REDUCER_ACTIONS.MEAL_FETCHING_SUCCCESS,
          payload: { meals: data },
        });
      }
    } catch (error) {
      dispatch({
        type: SINGLE_MEAL_REDUCER_ACTIONS.IS_ERROR_SEARCHED_MEAL,
      });
    }
  };

  useEffect(() => {
    fetchSingleMeal();
  }, []);

  if (state.isLoading) {
    return (
      <div className="w-[100%] md:px-8 px-4">
        <Loading />
      </div>
    );
  }

  if (!state.isLoading && state.receivedMeal !== null) {
    console.log(state.receivedMeal);
    return (
      <div className="w-[100%] md:px-8 px-4">
        <SingleMeal meal={state.receivedMeal} />
      </div>
    );
  }
};

export default SingleMealPage;
