import { ReactElement, createContext, useReducer, useMemo } from "react";

export type MealsSearcheType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type HomePageStateType = {
  isNavbarOpen: boolean;
  searchFilter: string;
  isLoading: boolean;
  isError: boolean;
  meals: MealsSearcheType[];
};

const initialHomePageState: HomePageStateType = {
  isNavbarOpen: false,
  searchFilter: "tomato",
  isLoading: false,
  isError: false,
  meals: [],
};

const HOMEPAGE_REDUCER_ACTIONS_TYPE = {
  OPEN_SIDEBAR: "OPEN_SIDEBAR",
  CLOSE_SIDEBAR: "CLOSE_SIDEBAR",
  SEARCH_BY_USER: "SEARCH_BY_USER",
  IS_LOADING_SEARCHED_MEALS: "IS_LOADING_SEARCHED_MEALS",
  MEALS_FETCHING_SUCCCESS: "MEALS_FETCHING_SUCCCESS",
  IS_ERROR_SEARCHED_MEALS: "IS_ERROR_SEARCHED_MEALS",
};

export type HomePageReducerActionType = typeof HOMEPAGE_REDUCER_ACTIONS_TYPE;

export type HomePageReducerAction = {
  type: string;
  payload?: HomePageStateType;
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
      const { searchFilter } = action.payload;
      return { ...state, searchFilter };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.IS_LOADING_SEARCHED_MEALS: {
      return { ...state, isLoading: true };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.MEALS_FETCHING_SUCCCESS: {
      if (!action.payload) {
        throw new Error("Error in input form");
      }
      const { meals } = action.payload;
      return { ...state, isLoading: false, meals: meals };
    }
    case HOMEPAGE_REDUCER_ACTIONS_TYPE.IS_ERROR_SEARCHED_MEALS: {
      return { ...state, isLoading: false, isError: true };
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
    searchFilter: "",
    isLoading: false,
    isError: false,
    meals: [],
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
