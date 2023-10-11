import React, { useState } from "react";
import { Meals } from ".";
import useHomePage from "../hooks/useHomePage";

const SearchedMeals = () => {
  const { state } = useHomePage();

  if (state.receivedMeals.length < 1) {
    return (
      <div className="container lg:px-0 mx-auto max-w-screen-xl px-4 lg:mt-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-1/2"
          role="alert"
        >
          <span className="block sm:inline">Nessun ricetta trovata</span>
        </div>
      </div>
    );
  }

  if (state.isError) {
    return (
      <div className="container lg:px-0 mx-auto max-w-screen-xl px-4 lg:mt-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-1/2"
          role="alert"
        >
          <span className="block sm:inline">
            Ooops qualcosa è andato storto
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-xl grid grid-cols-1 mx-auto py-10 mt-4 lg:grid-cols-3 gap-10">
      {state.receivedMeals.map((meal) => {
        return <Meals key={meal.idMeal} meal={meal} />;
      })}
    </div>
  );
};

export default SearchedMeals;
