import React, { ReactElement } from "react";
import { Meal } from "../context/HomePageContext";

type PropsType = {
  meal: Meal;
};

const Meals = ({ meal }: PropsType): ReactElement => {
  return <div>{meal.strMeal}</div>;
};

export default Meals;
