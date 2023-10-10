import { ReactElement, createContext, useReducer, useMemo } from "react";

export type SingleMealPayloadType = {
  meals: Meal;
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
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
};

export type SingleMealStateType = {
  isLoading: boolean;
  isError: boolean;
  receivedMeal: Meal | null;
};

const initialSingleMealPageState: SingleMealStateType = {
  isLoading: false,
  isError: false,
  receivedMeal: null,
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
  payload?: SingleMealPayloadType;
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
    receivedMeal: null,
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
