import { useSelector } from "react-redux";
import FallbackLoggedIn from "../../components/Fallback/FallbackLoggedin";
import { Fragment } from "react";
import AuthForm from "../../components/Auth/AuthForm";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  let content;
  if (!isLoggedIn) {
    content = <AuthForm />;
  }
  if (!isLoading && isLoggedIn) {
    content = <FallbackLoggedIn />;
  }

  return <Fragment>{content}</Fragment>;
};
export default Auth;
