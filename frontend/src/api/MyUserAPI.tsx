import { User } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Get the API base URL from the environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the useGetMyUser hook which returns the user data which will show in the profile page/ it will get the default user data which is stored in the database
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    // Basically this is the endpoint to get the user data from the API(backend) which is created MyUserRoute.ts
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  // useQuery hook is used to make the API request to get the user data
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if(error){
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

// Define the type for the user data returned by the API
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// Define the useCreateMyUser hook which returns a function to create the user data
export const useCreateMyUser = () => {
  // Get the access token from the Auth0 SDK
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    // Make a POST request to the API to create the user
    const reponse = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        // Provide the access token to the API
        Authorization: `Bearer ${accessToken}`,
        // Provide the content type
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!reponse.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

// Define the type for the user data
type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// Define the useUpdateMyUser hook which returns a function to update the user
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateUserRequest) => {
    // Get the access token from the Auth0 SDK
    const accessToken = await getAccessTokenSilently();
    // This is used to authenticate the request to the API
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  // useMutation hook is used to make the API request to update the user
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  // If there is an error, show a toast message with the error otherwise show a success message
  if (isSuccess) {
    toast.success("User updated successfully");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  // Return the updateUser function and the loading, error, and success states
  return { updateUser, isLoading };
};
