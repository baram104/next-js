import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import styles from "./Tasks.module.css";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { tasksActions } from "../../store/tasks-slice";
import Toggle from "../UI/Toggle";
import { Button } from "@mui/material";
import { Zoom } from "@mui/material";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "5rem",
    borderRadius: "5px",
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default function Tasks() {
  const classes = useStyles();
  const [isShown, setIsShown] = React.useState(false);
  const { hasError, httpRequest } = useHttp();
  const tasks = useSelector((state) => state.tasks.items);
  const checkedItems = useSelector((state) => state.tasks.checkedItems);
  const [checked, setChecked] = React.useState(checkedItems);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isTasksLoading = useSelector((state) => state.tasks.isLoading);
  const dispatch = useDispatch();
  const handleToggle = (task) => () => {
    const currentIndex = checked.indexOf(task);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(task);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setTimeout(() => {
      dispatch(tasksActions.setIsLoading(true));
    }, 300);

    fetch("/api/check-task", {
      method: "POST",
      body: JSON.stringify({
        id: task.id,
        checked: checked.indexOf(task) !== -1,
        currentUser: currentUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(tasksActions.setIsLoading(false));
        httpRequest(currentUser);
      });

    setChecked(newChecked);
  };
  const onToggleSortOptions = () => {
    setIsShown((prev) => !prev);
  };
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
  const tasksList =
    !isTasksLoading && tasks.length > 0 ? (
      tasks.map((task) => {
        const labelId = `checkbox-list-secondary-label-${task.id}`;
        const itemBackgroundClasses = priorityTransformer(task.priority);
        return (
          <ListItem
            className={`${styles[itemBackgroundClasses]}`}
            key={task.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(task)}
                checked={checked.indexOf(task) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
                sx={{ color: "black" }}
              />
            }
            disablePadding
          >
            <Link href={`/tasks/${task.id}`}>
              <ListItemButton>
                <ListItemText id={labelId} primary={task.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })
    ) : (
      <p style={{ textAlign: "center", padding: "20px" }}>Add new tasks</p>
    );

  return (
    <React.Fragment>
      <Button
        onClick={onToggleSortOptions}
        variant="outlined"
        sx={{
          margin: "auto",
          display: "block",
          marginTop: "3rem",
          marginBottom: "1rem",
        }}
      >
        Sort By
      </Button>

      <Zoom in={isShown} mountOnEnter unmountOnExit>
        <div>
          <Toggle />
        </div>
      </Zoom>

      <List
        className={classes.root}
        dense
        sx={{ width: "90%", maxWidth: 600, bgcolor: "background.paper" }}
      >
        {!isTasksLoading && tasksList}

        {hasError && <p>{hasError}</p>}
      </List>
    </React.Fragment>
  );
}
