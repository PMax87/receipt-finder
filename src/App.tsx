import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryPage, Contact, HomePage, MainIngredientSearchResultPage, SingleMealPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meal/:idMeal" element={<SingleMealPage />} />
        <Route path="/ingredient/:strIngredient" element={<MainIngredientSearchResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
