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
  const priorityTransformer = (taskPriority) => {
    if (taskPriority === "1") {
      return "high";
    }
    if (taskPriority === "2") {
      return "medium";
    }
    if (taskPriority === "3") {
      return "low";
    }
  };

  const currTask = tasks.find((task) => task.id === taskId);
  if (currTask) {
    const { description, id, title, date, priority } = currTask;
  } else {
  }

  return (
    <Fragment>
      {isLoggedIn ? (
        <TaskDetails
          id={id}
          title={title}
          description={description}
          date={date}
          priority={priorityTransformer(priority)}
        />
      ) : (
        <Fallback />
      )}
    </Fragment>
  );
};
export default TaskDetail;
