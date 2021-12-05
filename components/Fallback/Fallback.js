import classes from "./Fallback.module.css";
import Link from "next/link";
import { Button } from "@mui/material";

const Fallback = () => {
  return (
    <div className={classes.fallback}>
      <p>You need to log in first</p>
      <Link href="/" passHref={true}>
        <Button color="primary" variant="contained">
          Login
        </Button>
      </Link>
    </div>
  );
};
export default Fallback;
