// Type definitions for the frontend application are defined in the frontend/src/types.ts file. The UpdateUserRequest type is defined to represent the data that is sent to the API when updating a user. The User type is defined to represent the data that is returned from the API when creating a user. The User type is used in the useCreateMyUser hook to define the type of the user data that is returned from the API. The UpdateUserRequest type is used in the useUpdateMyUser hook to define the type of the user data that is sent to the API.

// The useCreateMyUser hook is defined to make a POST request to the API to create a user. The useUpdateMyUser hook is defined to make a PUT request to the API to update a user. The useCreateMyUser hook uses the useMutation hook from the react-query library to make the API request. The useUpdateMyUser hook uses the useMutation hook from the react-query library to make the API request. The useCreateMyUser hook returns an object with the createUser function, isLoading, isError, and isSuccess properties. The useUpdateMyUser hook returns an object with the updateUser function, isLoading, isError, and isSuccess properties.
export type User = {
   _id: string;
   email: string;
   name: string;
   addressLine1: string;
   city: string;
   country: string;
}

// Define the type for the user data
export type MenuItem = {
   _id: string;
   name: string;
   price: number;
}

// Define the type for the restaurant data
export type Restaurant = {
   _id: string;
   user: string;
   restaurantName: string;
   city: string;
   country: string;
   deliveryPrice: number;
   estimatedDeliveryTime: number;
   cuisines: string[];
   menutItems: MenuItem[];
   imageUrl: string;
   lastUpdated: string
}