import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../store/tasks-slice";
const useHttp = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const httpRequest = async (currUser) => {
    console.log("hook");
    const res = await fetch("/api/tasks");
    const data = await res.json();
    const taskData = data.map((task) => {
      return {
        title: task.title,
        description: task.description,
        id: task._id.toString(),
        currUser: task.currentUser,
      };
    });
    const finalTaskData = taskData.filter((task) => task.currUser === currUser);

    dispatch(tasksActions.setItems(finalTaskData));
  };
  return httpRequest;
};

export default useHttp;
