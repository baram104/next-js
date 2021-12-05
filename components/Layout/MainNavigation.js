import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { authActions } from "../../store/auth-slice";
import { useRouter } from "next/router";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DropdownMenu from "../UI/DropdownMenu";

export default function MainNavigation(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const onLogoutHandler = () => {
    if (isLoading) {
      if (!confirm("It's still loading, are you sure you want to leave?"))
        return;
    }
    router.push("/");
    dispatch(authActions.setIsLoading(true));
    dispatch(authActions.logout());

    dispatch(authActions.setIsLoading(false));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#161853" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Tasks Log
          </Typography>
          {!isLoggedIn && (
            <Link href="/" passHref={true}>
              <Button style={{ textTransform: "none" }} color="inherit">
                Login
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/tasks" passHref={true}>
              <Button
                style={{ textTransform: "none" }}
                color="inherit"
                className={classes.responsive}
              >
                My Tasks
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/tasks/new-task" passHref={true}>
              <Button
                style={{ textTransform: "none" }}
                color="inherit"
                className={classes.responsive}
              >
                Add a Task
              </Button>
            </Link>
          )}

          {isLoggedIn && (
            <Button
              style={{ textTransform: "none", marginLeft: "3rem" }}
              onClick={onLogoutHandler}
              color="inherit"
              className={classes.responsive}
            >
              Logout
            </Button>
          )}
          {isLoggedIn && (
            <DropdownMenu onLogout={onLogoutHandler} className={classes.menu} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
