import Card from "../UI/Card";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";

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

const Tasks = () => {
  const tasksList = DUMMY_MEALS.map((task) => (
    <TaskItem
      key={task.id}
      id={task.id}
      name={task.name}
      description={task.description}
    />
  ));

  return (
    <section className={classes.tasks}>
      <Card>
        <ul>{tasksList}</ul>
      </Card>
    </section>
  );
};

export default Tasks;
