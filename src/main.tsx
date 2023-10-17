import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HomePageProvider } from "./context/HomePageContext.tsx";
import { SingleMealProvider } from "./context/SingleReceipContext.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePageProvider>
      <SingleMealProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </SingleMealProvider>
    </HomePageProvider>
  </React.StrictMode>
);
