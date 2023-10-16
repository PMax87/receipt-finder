import ReactPaginate from "react-paginate";
import { useState } from "react";
import useHomePage from "../hooks/useHomePage";
import { Meals } from ".";

const Paginate = () => {
  const { state } = useHomePage();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const MEALS_PER_PAGE = 6;

  const offset = currentPage * MEALS_PER_PAGE;

  const currentPageData = state.receivedMeals
    .slice(offset, offset + MEALS_PER_PAGE)
    .map((meal) => <Meals key={meal.idMeal} meal={meal} />);

  const pageCount = Math.ceil(state.receivedMeals.length / MEALS_PER_PAGE);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <div className="container max-w-screen-xl grid grid-cols-1 mx-auto py-10 mt-4 lg:grid-cols-3 gap-10">
        {currentPageData}
      </div>
      <div className="container max-w-screen-xl mx-auto flex justify-center mt-5 transition-all">
        <ReactPaginate
          previousLabel={
            <>
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </>
          }
          nextLabel={
            <>
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </>
          }
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={
            "isolate inline-flex -space-x-px rounded-md shadow-sm"
          }
          previousLinkClassName={
            "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          }
          nextLinkClassName={
            "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          }
          breakLinkClassName={
            "relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          }
          pageLinkClassName={
            "relative inline-flex items-center px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          }
          activeClassName={
            "bg-fuchsia-500 border-fuchsia-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
          activeLinkClassName={
            "focus:z-20 focus-visible:outline text-white font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
          }
          disabledClassName={"text-gray-200"}
          disabledLinkClassName={"cursor-default"}
        />
      </div>
    </>
  );
};

export default Paginate;