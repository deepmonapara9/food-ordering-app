import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

// Get the API base URL from the environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  // Return the updateUser function and the loading, error, and success states
  return { updateUser, isLoading };
};
