import React, { ReactElement } from "react";
import { Meal } from "../context/HomePageContext";
import { useNavigate } from "react-router-dom";

type PropsType = {
  meal: Meal;
};

const Meals = ({ meal }: PropsType): ReactElement => {
  const navigate = useNavigate();
  const goToMeal = () => {
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <div className="relative">
      <img
        src={meal.strMealThumb}
        alt={meal.strMealThumb}
        className="rounded"
      />
      <div className="absolute bottom-0 w-full p-5 bg-zinc-700 bg-opacity-80">
        <div className="flex h-full items-center justify-between">
          <p className="text-zinc-100 w-2/3">{meal.strMeal}</p>
          <div
            className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white py-2 px-3 rounded cursor-pointer w-1/3 text-center transition-all"
            onClick={goToMeal}
          >
            View More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;
