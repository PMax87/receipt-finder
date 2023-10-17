import { useEffect } from "react";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { GetCategoryApiResponse } from "../context/CategoryContext";
import { SearchedMeals } from ".";
import useHomePage from "../hooks/useHomePage";
import { GetMealApiResponse } from "../context/SingleReceipContext";
const categoryUrl = "https://www.themealdb.com/api/json/v1/1/list.php?c=";
const mealsBycategoryUrl =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

const CategoriesColumn = () => {
  const { state, dispatch, CATEGORYPAGE_REDUCER_ACTIONS } = useCategory();
  const { dispatch: dispatchPage, HOMEPAGE_REDUCER_ACTIONS } = useHomePage();

  const fetchCategories = async () => {
    dispatch({ type: CATEGORYPAGE_REDUCER_ACTIONS.IS_LOADING_CATEGORIES });
    try {
      const response = await axios.get<GetCategoryApiResponse>(categoryUrl);
      const data = response.data?.meals;
      dispatch({
        type: CATEGORYPAGE_REDUCER_ACTIONS.CATEGORIES_FETCHING_SUCCESS,
        payload: { categories: data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMealsByCategory("beef");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMealsByCategory = async (category: string) => {
    dispatch({
      type: CATEGORYPAGE_REDUCER_ACTIONS.CHANGE_SELCTED_CATEGORY,
      payload: { selectedCategory: category },
    });
    const response = await axios.get<GetMealApiResponse>(
      `${mealsBycategoryUrl}${category}`
    );
    const data = response.data?.meals;
    dispatchPage({
      type: HOMEPAGE_REDUCER_ACTIONS.MEALS_FETCHING_SUCCCESS,
      payload: { meals: data },
    });
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <p className="py-10 text-3xl text-center">Elenco delle Categorie</p>
      <div className="flex mt-5">
        <ul className="w-1/6">
          <p className="font-semibold mb-5">Category</p>
          {state.receivedCategories.map((item, id) => {
            return (
              <li
                className="pb-2"
                onClick={() => fetchMealsByCategory(item.strCategory)}
                key={id}
              >
                {item.strCategory}
              </li>
            );
          })}
        </ul>
        <SearchedMeals />
      </div>
    </div>
  );
};

export default CategoriesColumn;
