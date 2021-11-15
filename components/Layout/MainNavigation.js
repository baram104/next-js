import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const onLogoutHandler = () => {
    dispatch(authActions.logout());
    router.replace("/");
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>My Tasks Log</div>
      </Link>
      )
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <Link href="/tasks">My Tasks</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link href="/tasks/new-task">Add a Task</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={onLogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
