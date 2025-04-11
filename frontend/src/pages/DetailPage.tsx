import { useGetRestaurant } from "@/api/RestaurantAPI";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { MenuItem as MenuItemType } from "@/type";

// Define the type for the cart item
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  // here we declare the useState hook to manage the cart items and setCartItems function to update the cart items and we gave it an initial value of an empty array
  // this is the state that will be used to manage the cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // this is used to update the cart in the real time
  const addToCart = (menuItem: MenuItemType) => {
    // this function will be used to add items to the cart and update the cart items state
    setCartItems((prevCartItems) => {
      // here we are checking if the cart item already exists in the cart items array or not
      // this is used to check if the cart item already exists in the cart items array
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;
      // here we are checking if the cart item already exists in the cart items array or not and updating the quantity accordingly
      if (existingCartItem) {
        // here we are updating the quantity of the cart item in the cart items array
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      // here we are saving the cart items to the session storage
      // this is used to save the cart items to the session storage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  // this function will be used to add items to the cart and update the cart items state
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      // here we are checking if the cart item already exists in the cart items array or not
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
