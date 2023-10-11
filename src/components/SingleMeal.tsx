import React, { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Meal } from "../context/SingleReceipContext";
import { YoutubeEmbed } from ".";

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
  const navigate = useNavigate();

  const goToAllMealsByIngredient = (strIngredient: string) => {
    navigate(`/ingredient/${strIngredient}`);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-5 mb-14">
      <div className="pt-3">
        <Link to="/" className="flex gap-3 items-center">
          <span>
            <BsArrowLeftSquareFill className="fill-fuchsia-500 text-3xl" />
          </span>
          <span className="uppercase text-2xl font-medium">Torna in home</span>
        </Link>
      </div>
      <div className="flex flex-wrap mt-14 justify-center">
        <div className="w-full lg:w-2/3">
          <YoutubeEmbed embedUrl={meal.strYoutube} />
        </div>
        <div className="lg:w-1/3 lg:mt-0 lg:pl-10 mt-5 flex flex-col pl-0 w-3/4 justify-center ">
          <h3 className="text-3xl capitalize">{meal.strMeal}</h3>
          <div className="flex mt-4 gap-5">
            <div className="rounded py-4 w-full bg-slate-200 ">
              <p className="text-2xl text-center">{meal.strCategory}</p>
            </div>
            <div className="rounded py-4 w-full bg-slate-200">
              <p className="text-2xl text-center">{meal.strArea}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="p-10 w-full lg:w-2/3 mx-auto bg-slate-100 rounded">
          <div className="mt-2">
            <h3 className="text-2xl font-medium">Ingredienti</h3>
            <p className="text-xl mt-1">Per {meal.strMeal}</p>
          </div>
          <div className="p-2">
            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-3 place-content-center justify-center list-disc mt-5">
              {instructionList.map((instruction, id) => {
                if (
                  instruction.ingredient !== "" &&
                  instruction.ingredient !== null &&
                  instruction.qty !== "" &&
                  instruction.qty !== null
                ) {
                  return (
                    <li key={id} className="flex sm:text-base text-xl">
                      <p
                        className="font-bold capitalize me-2 cursor-pointer underline"
                        onClick={() =>
                          goToAllMealsByIngredient(instruction.ingredient)
                        }
                      >
                        {instruction.ingredient + ":"}
                      </p>
                      <p>{instruction.qty}</p>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:px-20 px-0">
        <p className="leading-relaxed">{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default SingleMeal;
