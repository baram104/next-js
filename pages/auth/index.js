import { useSelector } from "react-redux";
import FallbackLoggedIn from "../../components/Fallback/FallbackLoggedin";
import { Fragment } from "react";
import AuthForm from "../../components/Auth/AuthForm";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>{!isLoggedIn ? <AuthForm /> : <FallbackLoggedIn />}</Fragment>
  );
};
export default Auth;
