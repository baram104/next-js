import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useValidation from "../../hooks/use-validation";
import classes from "./AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import useHttp from "../../hooks/use-http";
import tasksSlice, { tasksActions } from "../../store/tasks-slice";

const AuthForm = () => {
  const dispatch = useDispatch();
  const fetchTasks = useHttp();
  const currUser = useSelector((state) => state.auth.currentUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const httpRequest = async () => {
    console.log("clicked");
    const res = await fetch("/api/tasks");
    const data = await res.json();
    const taskData = data.map((task) => {
      return {
        title: task.title,
        description: task.description,
        id: task._id.toString(),
        currUser: task.currentUser,
      };
    });
    const finalTaskData = taskData.filter(
      (task) => task.currUser === enteredEmail
    );
    console.log(finalTaskData);
    dispatch(tasksActions.setItems(finalTaskData));
  };

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
    setIsLoading(true);
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
        setIsLoading(false);
        router.replace("/tasks");
        dispatch(
          authActions.login({ token: data.idToken, currUser: enteredEmail })
        );
        dispatch(tasksActions.setItems());
        fetchTasks(enteredEmail);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(error.message);
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
          {isLoading && <p>Sending request...</p>}
          {hasError && <p>{hasError}</p>}

          <button type="button" className={classes.toggle} onClick={onToggle}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
