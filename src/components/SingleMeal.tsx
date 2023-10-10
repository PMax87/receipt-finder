import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Meal } from "../context/SingleReceipContext";

type PropsType = {
  meal: Meal;
};

const SingleMeal = ({ meal }: PropsType): ReactElement => {
  return (
    <div className="container mx-auto max-w-screen-xl mt-5">
      <div className="pt-3">
        <Link to="/" className="flex gap-3 items-center">
          <span>
            <BsArrowLeftSquareFill className="fill-fuchsia-500 text-3xl" />
          </span>
          <span className="uppercase text-2xl font-medium">Torna in home</span>
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <img src={meal.strMealThumb} />
        </div>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default SingleMeal;
