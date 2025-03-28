import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
// import { useCreateMyUser } from "@/api/MyUserAPI";
// import { useNavigate } from "react-router-dom"

type Props = {
  children: React.ReactNode;
};

// This component wraps the Auth0Provider and provides a custom onRedirectCallback
const Auth0ProviderNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // Check if the Auth0 configuration is missing
  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Auth0 configuration missing");
  }

  // This function is called after the user is redirected back to the application
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  // This component wraps the Auth0Provider and provides a custom onRedirectCallback
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
        scope: "openid profile email offline_access", 
      }}
      cacheLocation="localstorage" 
      useRefreshTokens={true} 
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderNavigate;
