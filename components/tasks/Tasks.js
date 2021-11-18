import { useSelector } from "react-redux";
import Card from "../UI/Card";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks.items);

  const tasksList = tasks ? (
    tasks.map((task) => (
      <TaskItem
        key={task.id}
        id={task.id}
        name={task.title}
        description={task.description}
      />
    ))
  ) : (
    <p>Add new tasks</p>
  );

  return (
    <section className={classes.tasks}>
      <Card>
        <ul>{tasksList}</ul>
      </Card>
    </section>
  );
};

export default Tasks;
