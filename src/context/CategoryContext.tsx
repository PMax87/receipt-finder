import { ReactElement, createContext, useReducer, useMemo } from "react";

export type CategoryApiResponse = {
  categories: Categories[];
};

export type Categories = {
  strCategory: string;
};

export type CategoryPageStateType = {
  receivedCategories: Categories[];
  isLoading: boolean;
  isError: boolean;
};

const initialCategoryPageState: CategoryPageStateType = {
  receivedCategories: [],
  isLoading: false,
  isError: false,
};

const CATEGORYPAGE_REDUCER_ACTIONS_TYPE = {
  IS_LOADING_CATEGORY: "IS_LOADING_CATEGORY",
  IS_ERROR_LOADING_CATEGORY: "IS_ERROR_LOADING_CATEGORY",
};

export type CategoryPageReducerAction = {
  type: string;
  payload?: CategoryApiResponse;
};

const reducer = (
  state: CategoryPageStateType,
  action: CategoryPageReducerAction
): CategoryPageStateType => {
  switch (action.type) {
    case CATEGORYPAGE_REDUCER_ACTIONS_TYPE.IS_LOADING_CATEGORY: {
      return { ...state, isLoading: true };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};
