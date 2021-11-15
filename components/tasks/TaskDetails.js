import classes from "./TaskDetails.module.css";

const TaskDetails = (props) => {
  return (
    <div className={classes.task}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default TaskDetails;
