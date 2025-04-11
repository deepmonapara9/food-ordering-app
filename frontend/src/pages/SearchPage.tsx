import { useSearchRestaurants } from "@/api/RestaurantAPI";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

// SearchPage component is responsible for displaying the search results of restaurants based on the city parameter from the URL.
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  // useState is a hook that allows you to add React state to function components
  // searchState is the state variable that holds the search query
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  // isExpanded is a state variable that determines whether the cuisine filter is expanded or not
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // useParams is a hook that returns an object of key/value pairs of the dynamic params from the current URL that were matched by <Route path>
  const { city } = useParams();
  // useSearchRestaurants is a custom hook that fetches data from the API
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  // setSortOption is a function that updates the sortOption state variable
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  // setSelectedCuisines is a function that updates the selectedCuisines state variable
  // selectedCuisines is an array of strings that holds the selected cuisines
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  // this will be used to change the page according to the pagination
  // setPage is a function that updates the page state variable
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // setSearchState is a function that updates the searchState state variable
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1, // reset page to 1 when search query changes
    }));
  };

  // resetSearch is a function that resets the search query to an empty string
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1, // reset page to 1 when search query is reset
    }));
  };

  if (isLoading) {
    <span>Loading....</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found.</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {/* This section displays the list of restaurants */}
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
