import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksActions } from "../store/tasks-slice";
const useHttp = () => {
  const [hasError, setHasError] = useState(null);
  const dispatch = useDispatch();

  const httpRequest = async (currUser) => {
    try {
      dispatch(tasksActions.setIsLoading(true));
      const res = await fetch("/api/tasks", { method: "POST", body: currUser });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      const taskData = data.map((task) => {
        return {
          title: task.title,
          description: task.description,
          id: task._id.toString(),
          currUser: task.currentUser,
          date: new Date(task.date).toDateString(),
          priority: task.priority,
          checked: task.checked,
        };
      });
      // const finalTaskData = taskData.filter(
      //   (task) => task.currUser === currUser
      // );

      dispatch(tasksActions.setItems(taskData));
      dispatch(tasksActions.setCheckedItems(taskData));
      dispatch(tasksActions.setIsLoading(false));
    } catch (error) {
      setHasError(error);
      dispatch(tasksActions.setIsLoading(false));
    }
  };

  return {
    httpRequest,
    hasError,
  };
};

export default useHttp;
