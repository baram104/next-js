import TaskDetails from "../../components/tasks/TaskDetails";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import Fallback from "../../components/Fallback/Fallback";
import { useRouter } from "next/router";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Buy Toilet Paper",
    description: "Finest fish and veggies",
  },
  {
    id: "m2",
    name: "Paint the garage",
    description: "Need to get a painting brush and some pain",
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
  },
];

const TaskDetail = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const taskId = router.query.taskId;

  const currTask = DUMMY_MEALS.find((task) => task.id === taskId);
  if (taskId) {
    const { description, id, name } = currTask;
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
