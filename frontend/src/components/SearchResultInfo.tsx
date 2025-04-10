import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

// SearchResultInfo component displays the total number of restaurants found in a specific city
// and provides a link to change the location.
// It is a functional component that takes in two props: total (number of restaurants) and city (name of the city).
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link 
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
