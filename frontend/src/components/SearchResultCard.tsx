import { Restaurant } from "@/type";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

// SearchResultCard component displays the restaurant's image, name, cuisines, estimated delivery time, and delivery price.
// It is a functional component that takes in a single prop: restaurant (of type Restaurant).
// The component uses the Link component from react-router-dom to navigate to the restaurant's detail page when clicked.
// The component also uses the AspectRatio component to maintain the aspect ratio of the image.
const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {/* This section displays the cuisines of the restaurant */}
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {/* This section displays a dot between the cuisines */}
                {/* The dot is displayed only if it's not the last item in the array */}
                {/* The index is used to check if it's the last item */}
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ₹{(restaurant.deliveryPrice).toFixed(2)}
            </div>
          </div> 
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
