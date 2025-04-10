import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/type";
import { useQuery } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  // this params is used to send the search query to the backend 
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);

  // this is a custom hook that will be used to search for restaurants
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    // here we are checking the search endpoint with the backend
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  };

  // this is a react-query hook that will be used to fetch the data from the backend
  // it will be used to search for restaurants based on the city
  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    {
      enabled: !!city, // only run the query if city is defined
    }
  );

  return { results, isLoading };
};
