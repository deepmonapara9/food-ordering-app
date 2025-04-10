import { useSearchRestaurants } from "@/api/RestaurantAPI";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  // useParams is a hook that returns an object of key/value pairs of the dynamic params from the current URL that were matched by <Route path>
  const { city } = useParams();
  // useSearchRestaurants is a custom hook that fetches data from the API
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    <span>Loading....</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found.</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
       insert cuisines list here
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/* <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        /> */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          {/* <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          /> */}
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        {/* <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        /> */}
      </div>
    </div>
  );
};

export default SearchPage;
