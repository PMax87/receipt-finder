import { useContext } from "react";
import CategoryContext from "../context/CategoryContext";
import { UseCategoryPageContextType } from "../context/CategoryContext";

const useCategory = (): UseCategoryPageContextType => {
  return useContext(CategoryContext);
};

export default useCategory;
