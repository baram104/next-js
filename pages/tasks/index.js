import Tasks from "../../components/tasks/Tasks";
import { useSelector } from "react-redux";

import { Fragment } from "react";
import Fallback from "../../components/Fallback/Fallback";
const MyTasks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <Fragment>{isLoggedIn ? <Tasks /> : <Fallback />}</Fragment>;
};
export default MyTasks;
