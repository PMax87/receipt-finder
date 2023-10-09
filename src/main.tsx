import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HomePageProvider } from "./context/HomePageContext.tsx";
import { SingleMealProvider } from "./context/SingleReceipContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HomePageProvider>
      <SingleMealProvider>
        <App />
      </SingleMealProvider>
    </HomePageProvider>
  </React.StrictMode>
);
