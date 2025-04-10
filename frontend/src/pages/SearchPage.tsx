import { useSearchRestaurants } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();

  const { results } = useSearchRestaurants(city);

  return (
    <span>
      User searched for {city}{" "}
      <span>
        {results?.data.map((restaurnat) => (
          <span>
            found - {restaurnat.restaurantName}, {restaurnat.city}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
