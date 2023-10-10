import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Meal } from "../context/SingleReceipContext";

type PropsType = {
  meal: Meal;
};

export interface MealIngradient {
  ingredient: string;
  qty: string;
}

class Mapper {
  static map(meal: Meal): MealIngradient[] {
    return [
      { ingredient: meal.strIngredient1, qty: meal.strMeasure1 },
      { ingredient: meal.strIngredient2, qty: meal.strMeasure2 },
      { ingredient: meal.strIngredient3, qty: meal.strMeasure3 },
      { ingredient: meal.strIngredient4, qty: meal.strMeasure4 },
      { ingredient: meal.strIngredient5, qty: meal.strMeasure5 },
      { ingredient: meal.strIngredient6, qty: meal.strMeasure6 },
      { ingredient: meal.strIngredient7, qty: meal.strMeasure7 },
      { ingredient: meal.strIngredient8, qty: meal.strMeasure8 },
      { ingredient: meal.strIngredient9, qty: meal.strMeasure9 },
      { ingredient: meal.strIngredient10, qty: meal.strMeasure10 },
      { ingredient: meal.strIngredient11, qty: meal.strMeasure11 },
      { ingredient: meal.strIngredient12, qty: meal.strMeasure12 },
      { ingredient: meal.strIngredient13, qty: meal.strMeasure13 },
      { ingredient: meal.strIngredient14, qty: meal.strMeasure14 },
      { ingredient: meal.strIngredient15, qty: meal.strMeasure15 },
      { ingredient: meal.strIngredient16, qty: meal.strMeasure16 },
      { ingredient: meal.strIngredient17, qty: meal.strMeasure17 },
      { ingredient: meal.strIngredient18, qty: meal.strMeasure18 },
      { ingredient: meal.strIngredient19, qty: meal.strMeasure19 },
      { ingredient: meal.strIngredient20, qty: meal.strMeasure20 },
    ];
  }
}

const SingleMeal = ({ meal }: PropsType): ReactElement => {
  const instructionList = Mapper.map(meal);

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
      <div className="grid grid-cols-2 mt-14 gap-14">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="flex flex-col">
          <h3 className="text-3xl capitalize">{meal.strMeal}</h3>
          <div className="flex mt-4 gap-5">
            <div className="rounded p-3 w-32 bg-slate-200 ">
              <h4 className="font-semibold">Category:</h4>
              <p className="rounded bg-slate-200">{meal.strCategory}</p>
            </div>
            <div className="rounded p-3 w-32 bg-slate-200 ">
              <h4 className="font-semibold">Area:</h4>
              <p className="rounded bg-slate-200">{meal.strArea}</p>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-3xl">Ingredienti:</h3>
            {instructionList.map((instruction, id) => {
              if (instruction.ingredient !== "") {
                return (
                  <li key={id}>
                    {instruction.ingredient} {instruction.qty}
                  </li>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMeal;
