import classes from "./Fallback.module.css";
import Link from "next/link";

const Fallback = () => {
  return (
    <div className={classes.fallback}>
      <p>You need to log in first</p>
      <Link href="/auth">Login</Link>
    </div>
  );
};
export default Fallback;
