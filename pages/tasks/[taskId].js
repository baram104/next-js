import TaskDetails from "../../components/tasks/TaskDetails";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import Fallback from "../../components/Fallback/Fallback";
import { useRouter } from "next/router";

const TaskDetail = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const tasks = useSelector((state) => state.tasks.items);
  const router = useRouter();
  const taskId = router.query.taskId;

  const currTask = tasks.find((task) => task.id === taskId);
  if (taskId) {
    const { description, id, title } = currTask;
  }

  return (
    <Fragment>
      {isLoggedIn ? (
        <TaskDetails id={id} title={name} description={description} />
      ) : (
        <Fallback />
      )}
    </Fragment>
  );
};
export default TaskDetail;
