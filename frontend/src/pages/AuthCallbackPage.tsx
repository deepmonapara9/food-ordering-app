import { useCreateMyUser } from "@/api/MyUserAPI";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type AuthCallbackPageProps = {};

const AuthCallbackPage: React.FC<AuthCallbackPageProps> = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  // This is a workaround to prevent the user from being created multiple times
  const hasCreatedUser = useRef(false);

  // Create the user when the user is logged in
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  // This page should not be visible to the user
  return <>Loading...</>;
};

export default AuthCallbackPage;
