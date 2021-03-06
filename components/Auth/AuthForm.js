import { useState } from "react";
import { useRouter } from "next/router";
import useValidation from "../../hooks/use-validation";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import useHttp from "../../hooks/use-http";
import { tasksActions } from "../../store/tasks-slice";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthForm = () => {
  const dispatch = useDispatch();
  const { httpRequest } = useHttp();

  const [isLogin, setIsLogin] = useState(true);
  const isAuthLoading = useSelector((state) => state.auth.isLoading);
  const [hasError, setHasError] = useState(null);
  const router = useRouter();
  const {
    onToggle: onEmailToggle,
    hasError: hasEmailError,
    isValid: isEmailValid,
    enteredValue: enteredEmail,
    onBlurHandler: onEmailBlurHandler,
    onChangeHandler: onEmailChangeHandler,
  } = useValidation((value) => value.trim().includes("@"));
  const {
    onToggle: onPasswordToggle,
    hasError: hasPasswordError,
    enteredValue: enteredPassword,
    isValid: isPasswordValid,
    onBlurHandler: onPasswordBlurHandler,
    onChangeHandler: onPasswordChangeHandler,
  } = useValidation((value) => value.trim().length > 0);
  let formIsValid = false;

  if (isEmailValid && isPasswordValid) {
    formIsValid = true;
  }

  const emailClasses = hasEmailError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const passwordClasses = hasPasswordError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  let url;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.setIsLoading(true));
    setHasError(null);
    if (formIsValid && isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmlxKQjhx3IeMunokBUpHN7GZeo-nc39A";
      console.log("login");
    }
    if (formIsValid && !isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmlxKQjhx3IeMunokBUpHN7GZeo-nc39A";
      console.log("sign up");
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage;
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        router.replace("/tasks");

        dispatch(
          authActions.login({ token: data.idToken, currUser: enteredEmail })
        );
        dispatch(tasksActions.setItems());
        httpRequest(enteredEmail);
        dispatch(authActions.setIsLoading(false));
      })
      .catch((error) => {
        setHasError(error.message);
        dispatch(authActions.setIsLoading(false));
      });
  };
  const onToggle = () => {
    setIsLogin((prevState) => !prevState);
    onPasswordToggle();
    onEmailToggle();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={onEmailChangeHandler}
            onBlur={onEmailBlurHandler}
          />
        </div>
        <div className={passwordClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={onPasswordChangeHandler}
            onBlur={onPasswordBlurHandler}
          />
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          {isAuthLoading && <LoadingSpinner />}
          {hasError && <p>{hasError}</p>}
          <button type="button" className={classes.toggle} onClick={onToggle}>
            {isLogin ? (
              <p>
                Do not have an account? <br /> Create new account
              </p>
            ) : (
              "Login with existing account"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
