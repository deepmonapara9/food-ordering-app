import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";

const CheckoutButton = () => {
  // this will authenticate the user using auth0
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  // this will redirect the user to the checkout page when user is authenticated
  const { pathname } = useLocation();

  // it will redirect the user to the checkout page when user is authenticated
  // this function will be called when the user clicks on the login button
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  // this will check if the user is authenticated or not
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  // this will check if the user is authenticated and loading
  if (isAuthLoading) {
    return <LoadingButton />;
  }
};

export default CheckoutButton;
