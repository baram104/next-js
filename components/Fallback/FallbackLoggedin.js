import classes from "./Fallback.module.css";

const FallbackLoggedIn = () => {
  return (
    <div className={classes.fallback}>
      <p>You are already logged in</p>
    </div>
  );
};
export default FallbackLoggedIn;
