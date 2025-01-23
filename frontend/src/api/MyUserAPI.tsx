import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

// Get the API base URL from the environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  // Get the access token from the Auth0 SDK
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const reponse = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        // Provide the access token to the API
        "Authorization": `Bearer ${accessToken}`, 
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
