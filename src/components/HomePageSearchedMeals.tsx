import useHomePage from "../hooks/useHomePage";

const HomePageSearchedMeals = () => {
  const { state } = useHomePage();
  const { isLoading, isError, meals } = state;

  console.log(meals.length);

  if (!meals) {
    return <p>Nessuna ricetta trovata</p>;
  }
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }
  //   {
  //     {
  //       meals.map((item) => {
  //         return <div>{item.strMeal}</div>;
  //       });
  //     }
  //   }
};

export default HomePageSearchedMeals;
