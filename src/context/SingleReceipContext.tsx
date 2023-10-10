import { ReactElement, createContext, useReducer, useMemo } from "react";

export type ApiResponse = {
  meals: Meal[];
};

export type GetMealApiResponse = {
  meals: Meal[];
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
};

export type SingleMealStateType = {
  isLoading: boolean;
  isError: boolean;
  receivedMeal: Meal[];
};

const initialSingleMealPageState: SingleMealStateType = {
  isLoading: false,
  isError: false,
  receivedMeal: [],
};

const SINGLE_MEAL_REDUCER_ACTIONS_TYPE = {
  IS_LOADING_SEARCHED_MEAL: "IS_LOADING_SEARCHED_MEALS",
  IS_ERROR_SEARCHED_MEAL: "IS_ERROR_SEARCHED_MEALS",
  MEAL_FETCHING_SUCCCESS: "MEALS_FETCHING_SUCCCESS",
};

export type SingleMealReducerActionType =
  typeof SINGLE_MEAL_REDUCER_ACTIONS_TYPE;

export type SingleMealReducerAction = {
  type: string;
  payload?: ApiResponse;
};

const reducer = (
  state: SingleMealStateType,
  action: SingleMealReducerAction
): SingleMealStateType => {
  switch (action.type) {
    case SINGLE_MEAL_REDUCER_ACTIONS_TYPE.IS_LOADING_SEARCHED_MEAL: {
      return { ...state, isLoading: true };
    }
    case SINGLE_MEAL_REDUCER_ACTIONS_TYPE.MEAL_FETCHING_SUCCCESS: {
      if (!action.payload) {
        throw new Error(
          "Errore nella risposta API: il campo 'meals' è mancante o non è un array"
        );
      }
      return {
        ...state,
        isLoading: false,
        receivedMeal: action.payload?.meals || [],
      };
    }
    case SINGLE_MEAL_REDUCER_ACTIONS_TYPE.IS_ERROR_SEARCHED_MEAL: {
      return { ...state, isLoading: false, isError: false };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useSingleMealPageContext = (
  initialSingleMealPageState: SingleMealStateType
) => {
  const [state, dispatch] = useReducer(reducer, initialSingleMealPageState);

  const SINGLE_MEAL_REDUCER_ACTIONS = useMemo(() => {
    return SINGLE_MEAL_REDUCER_ACTIONS_TYPE;
  }, []);
  return {
    dispatch,
    SINGLE_MEAL_REDUCER_ACTIONS,
    state,
  };
};

export type UseSingleMealContextType = ReturnType<
  typeof useSingleMealPageContext
>;

const initialSingleMealPageContextState: UseSingleMealContextType = {
  dispatch: () => {},
  SINGLE_MEAL_REDUCER_ACTIONS: SINGLE_MEAL_REDUCER_ACTIONS_TYPE,
  state: {
    isError: false,
    isLoading: false,
    receivedMeal: [],
  },
};

export const SingleMealContext = createContext<UseSingleMealContextType>(
  initialSingleMealPageContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const SingleMealProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <SingleMealContext.Provider
      value={useSingleMealPageContext(initialSingleMealPageState)}
    >
      {children}
    </SingleMealContext.Provider>
  );
};

export default SingleMealContext;
