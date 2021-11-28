import Tasks from "../../components/tasks/Tasks";
import { useSelector } from "react-redux";

import { Fragment } from "react";
import Fallback from "../../components/Fallback/Fallback";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
const MyTasks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAuthLoading = useSelector((state) => state.auth.isLoading);
  const isTasksLoading = useSelector((state) => state.tasks.isLoading);
  let content;
  if (isTasksLoading) {
    content = <LoadingSpinner />;
  }
  if (isLoggedIn && !isTasksLoading) {
    content = <Tasks />;
  }
  if (!isLoggedIn && !isAuthLoading) {
    content = <Fallback />;
  }
  return <Fragment>{content}</Fragment>;
};
export default MyTasks;
