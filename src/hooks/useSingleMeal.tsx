import { useContext } from "react";
import SingleMealContext from "../context/SingleReceipContext";
import { UseSingleMealContextType } from "../context/SingleReceipContext";

const useSingleMeal = (): UseSingleMealContextType => {
  return useContext(SingleMealContext);
};

export default useSingleMeal;
