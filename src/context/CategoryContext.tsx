import { ReactElement, createContext, useReducer, useMemo } from "react";

export type CategoryApiResponse = {
  categories?: Categories[];
  selectedCategory?: string
};

export type GetCategoryApiResponse = {
  meals?: Categories[];
};

export type Categories = {
  strCategory: string;
};

export type CategoryPageStateType = {
  receivedCategories: Categories[];
  isLoading: boolean;
  isError: boolean;
  selectedCategory: string,
};

const initialCategoryPageState: CategoryPageStateType = {
  receivedCategories: [],
  isLoading: false,
  isError: false,
  selectedCategory: "beef"
};

const CATEGORYPAGE_REDUCER_ACTIONS_TYPE = {
  IS_LOADING_CATEGORIES: "IS_LOADING_CATEGORIES",
  IS_ERROR_LOADING_CATEGORY: "IS_ERROR_LOADING_CATEGORY",
  CATEGORIES_FETCHING_SUCCESS: "CATEGORIES_FETCHING_SUCCESS",
  CHANGE_SELCTED_CATEGORY: "CHANGE_SELECTED_CATEGORY"
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
    case CATEGORYPAGE_REDUCER_ACTIONS_TYPE.IS_LOADING_CATEGORIES: {
      return { ...state, isLoading: true };
    }
    case CATEGORYPAGE_REDUCER_ACTIONS_TYPE.CATEGORIES_FETCHING_SUCCESS: {
      if (!action.payload) {
        throw new Error("Problem");
      }
      const { categories } = action.payload;
      const newCategories = categories == undefined ? [] : categories;
      return { ...state, isLoading: false, receivedCategories: newCategories };
    }
    case CATEGORYPAGE_REDUCER_ACTIONS_TYPE.CHANGE_SELCTED_CATEGORY: {
      if (!action.payload) {
        throw new Error("Problem")
      }
      const {selectedCategory} = action.payload;
      return {...state, selectedCategory}
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useCategoryPageContext = (
  initialCategoryPageState: CategoryPageStateType
) => {
  const [state, dispatch] = useReducer(reducer, initialCategoryPageState);

  const CATEGORYPAGE_REDUCER_ACTIONS = useMemo(() => {
    return CATEGORYPAGE_REDUCER_ACTIONS_TYPE;
  }, []);

  return {
    dispatch,
    CATEGORYPAGE_REDUCER_ACTIONS,
    state,
  };
};

export type UseCategoryPageContextType = ReturnType<
  typeof useCategoryPageContext
>;

const initialCategoryPageContextState: UseCategoryPageContextType = {
  dispatch: () => {},
  CATEGORYPAGE_REDUCER_ACTIONS: CATEGORYPAGE_REDUCER_ACTIONS_TYPE,
  state: {
    isError: false,
    isLoading: false,
    receivedCategories: [],
    selectedCategory: "beef"
  },
};
export const CategoryContext = createContext<UseCategoryPageContextType>(
  initialCategoryPageContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CategoryProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CategoryContext.Provider
      value={useCategoryPageContext(initialCategoryPageState)}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
