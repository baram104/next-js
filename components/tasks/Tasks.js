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
import { Button } from "@mui/material";
import Card from "../UI/Card";
import SortBy from "../UI/SortBy";
import { ListItemIcon } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import { margin } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles({
  root: {
    // margin: "auto",
    // float: "right",
    // marginTop: "2rem",
    // marginBottom: "5rem",
    // borderRadius: "5px",
    // paddingTop: 0,
    // paddingBottom: 0,
  },
});

export default function Tasks() {
  const classes = useStyles();
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
  const tasksList = tasks.map((task) => {
    const labelId = `checkbox-list-label-${task.id}`;
    const itemBackgroundClasses = priorityTransformer(task.priority);
    const daysLeftDiff = new Date(task.date).getTime() - new Date().getTime();
    const daysLeft = Math.floor(daysLeftDiff / (1000 * 3600 * 24)) + 1;
    let daysLeftContent;
    if (daysLeft > 0 && daysLeft < 8) {
      daysLeftContent = (
        <p style={{ fontSize: "0.8rem", color: "#EC255A" }}>
          {daysLeft} days to complete the task
        </p>
      );
    }
    if (daysLeft === 0) {
      daysLeftContent = (
        <p style={{ fontSize: "0.8rem", color: "#EC255A" }}>
          Task has to be completed today!
        </p>
      );
    }
    return (
      <ListItem
        // className={`${styles[itemBackgroundClasses]}`}
        className={styles.listitem}
        sx={{ backgroundColor: "transparent" }}
        key={task.id}
        disablePadding
      >
        <ListItemIcon>
          <Checkbox
            edge="end"
            sx={{
              margin: "auto",
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            icon={
              <CheckCircleOutlineIcon
                className={`${styles["checkbox-" + itemBackgroundClasses]}`}
              />
            }
            checkedIcon={
              <CheckCircleIcon
                className={`${styles["checkbox-" + itemBackgroundClasses]}`}
              />
            }
            onChange={handleToggle(task)}
            checked={checked.indexOf(task) !== -1}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <Link href={`/tasks/${task.id}`}>
          <ListItemButton>
            <ListItemText
              id={labelId}
              primary={task.title}
              secondary={`Final date - ${task.date}`}
            />
            {daysLeftContent}
          </ListItemButton>
        </Link>
      </ListItem>
    );
  });
  // const fallbackMessage = (
  //   <Link href={"/tasks/new-task"}>
  //     <Button
  //       style={{
  //         textAlign: "center",
  //         // padding: "20px",
  //         margin: "auto",
  //         display: "block",
  //         justifyContent: "center",
  //       }}
  //     >
  //       Add new tasks
  //     </Button>
  //   </Link>
  // );

  return (
    <React.Fragment>
      <Card>
        {!isTasksLoading && tasks.length > 0 && <SortBy />}
        {/* {!isTasksLoading && fallbackMessage && tasks.length === 0} */}

        <List
          className={classes.root}
          dense
          sx={{
            // width: "90%",
            // maxWidth: "calc(100%-240px)",
            minWidth: "0",
            // flexGrow: 1,
            // float: "right",
            // p: 3,
          }}
        >
          {/* {!isTasksLoading && tasksList} */}
          {!isTasksLoading && tasks.length > 0 && tasksList}
          <ListItem
            // className={`${styles[itemBackgroundClasses]}`}
            className={styles.listitem}
            sx={{ backgroundColor: "transparent" }}
            key={"lastTask"}
            disablePadding
          >
            <Link href="/tasks/new-task">
              <ListItemButton>
                <AddIcon
                  fontSize="large"
                  sx={{ color: "#161853", margin: "auto" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          {hasError && <p>{hasError}</p>}
        </List>
      </Card>
    </React.Fragment>
  );
}
