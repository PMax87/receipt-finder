import { useContext } from "react";
import HomePageContext from "../context/HomePageContext";
import { UseHomePageContextType } from "../context/HomePageContext";

const useHomePage = (): UseHomePageContextType => {
  return useContext(HomePageContext);
};

export default useHomePage;
