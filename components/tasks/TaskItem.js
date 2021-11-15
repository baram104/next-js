import classes from "./TaskItem.module.css";
import Link from "next/link";

const TaskItem = (props) => {
  return (
    <li className={classes.task}>
      <div>
        <h3>
          <Link href={`/tasks/${props.id}`}>{props.name}</Link>
        </h3>
      </div>
    </li>
  );
};

export default TaskItem;
