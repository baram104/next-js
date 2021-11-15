import { useSelector } from "react-redux";
import { Fragment } from "react";
import Fallback from "../../components/Fallback/Fallback";
import NewTaskForm from "../../components/tasks/NewTaskForm";

const NewTask = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <Fragment>{isLoggedIn ? <NewTaskForm /> : <Fallback />}</Fragment>;
};
export default NewTask;
