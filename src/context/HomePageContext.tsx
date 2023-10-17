import { ReactElement, createContext, useReducer, useMemo } from "react";

export type ApiResponse = {
  meals?: Meal[];
  filteredMeals?: Meal[];
  searchedFilter?: string;
  mealsFilterInput?: string;
};

export type GetMealsApiResponse = {
  meals: Meal[];
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type HomePageStateType = {
  isNavbarOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  receivedMeals: Meal[];
  filteredMeals: Meal[];
  searchedFilter: string;
  mealsFilterInput: string;
};

const initialHomePageState: HomePageStateType = {
  isNavbarOpen: false,
  isLoading: true,
  isError: false,
  receivedMeals: [],
  filteredMeals: [],
  searchedFilter: "tomato",
  mealsFilterInput: "",
};

const HOMEPAGE_REDUCER_ACTIONS_TYPE = {
  OPEN_SIDEBAR: "OPEN_SIDEBAR",
  CLOSE_SIDEBAR: "CLOSE_SIDEBAR",
  SEARCH_BY_USER: "SEARCH_BY_USER",
  IS_LOADING_SEARCHED_MEALS: "IS_LOADING_SEARCHED_MEALS",
  MEALS_FETCHING_SUCCCESS: "MEALS_FETCHING_SUCCCESS",
  IS_ERROR_SEARCHED_MEALS: "IS_ERROR_SEARCHED_MEALS",
  FILTER_RESULT_BY_USER: "FILTER_RESULT_BY_USER",
};

export type HomePageReducerAction = {
  type: string;
  payload?: ApiResponse;
};

const reducer = (
  state: HomePageStateType,
  action: HomePageReducerAction
): HomePageStateType => {
  switch (action.type) {
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.OPEN_SIDEBAR: {
      return { ...state, isNavbarOpen: true };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.CLOSE_SIDEBAR: {
      return { ...state, isNavbarOpen: false };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.SEARCH_BY_USER: {
      if (!action.payload) {
        throw new Error("Error in input form");
      }
      const { searchedFilter } = action.payload;
      const filter = searchedFilter == null ? "" : searchedFilter;
      return { ...state, searchedFilter: filter };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.IS_LOADING_SEARCHED_MEALS: {
      return { ...state, isLoading: true };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.MEALS_FETCHING_SUCCCESS: {
      if (!action.payload) {
        throw new Error("Error in action");
      }
      const { meals } = action.payload;
      const newMeals = meals == undefined ? [] : meals;
      return {
        ...state,
        isLoading: false,
        receivedMeals: newMeals,
        filteredMeals: newMeals,
      };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.IS_ERROR_SEARCHED_MEALS: {
      return { ...state, isLoading: false, isError: true };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.FILTER_RESULT_BY_USER: {
      if (!action.payload) {
        throw new Error("Error in input form");
      }
      const { receivedMeals } = state;
      const { mealsFilterInput } = action.payload;
      const newMealFilter = mealsFilterInput == null ? "" : mealsFilterInput;
      const tempReceivedMeals = [...receivedMeals];
      const newFilteredMeals = tempReceivedMeals.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(newMealFilter);
      });
      return {
        ...state,
        mealsFilterInput: newMealFilter,
        filteredMeals: newFilteredMeals,
      };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useHomePageContext = (initialHomePageState: HomePageStateType) => {
  const [state, dispatch] = useReducer(reducer, initialHomePageState);

  const HOMEPAGE_REDUCER_ACTIONS = useMemo(() => {
    return HOMEPAGE_REDUCER_ACTIONS_TYPE;
  }, []);

  return {
    dispatch,
    HOMEPAGE_REDUCER_ACTIONS,
    state,
  };
};

export type UseHomePageContextType = ReturnType<typeof useHomePageContext>;

const initialHomePageContextState: UseHomePageContextType = {
  dispatch: () => {},
  HOMEPAGE_REDUCER_ACTIONS: HOMEPAGE_REDUCER_ACTIONS_TYPE,
  state: {
    isNavbarOpen: false,
    searchedFilter: "",
    isLoading: false,
    isError: false,
    receivedMeals: [],
    filteredMeals: [],
    mealsFilterInput: "",
  },
};

export const HomePageContext = createContext<UseHomePageContextType>(
  initialHomePageContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const HomePageProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <HomePageContext.Provider value={useHomePageContext(initialHomePageState)}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContext;
