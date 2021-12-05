import classes from "./TaskDetails.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/tasks-slice";

import { useRouter } from "next/router";
import useHttp from "../../hooks/use-http";

import CardActions from "@mui/material/CardActions";

import { CardHeader } from "@mui/material";

// const TaskDetails = (props) => {
//   return (
//     <div className={classes.task}>
//       <h3>{props.title}</h3>
//       <p>{props.description}</p>
//       <p>{props.date}</p>
//     </div>
//   );
// };

// export default TaskDetails;
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TasksDetails(props) {
  const dispatch = useDispatch();
  const { httpRequest } = useHttp();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const onDeleteHandler = () => {
    dispatch(tasksActions.setIsLoading(true));
    fetch("/api/delete-task", {
      method: "POST",
      body: JSON.stringify({ id: props.id, currentUser: currentUser }),
    })
      .then((res) => res.json)
      .then((data) => httpRequest(currentUser));
    router.replace("/tasks");
  };

  return (
    // <Card
    //   sx={{
    //     minWidth: 275,
    //     maxWidth: 500,
    //     textAlign: "center",
    //     margin: "auto",
    //     marginTop: "5rem",
    //     boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
    //     borderRadius: "14px",
    //   }}
    //   className={classes[props.priority]}
    // >
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {props.title}
    //     </Typography>
    //     <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //       {props.date} <FontAwesomeIcon icon={faHourglassEnd} spin />
    //     </Typography>
    //     <Typography variant="body2">{props.description}</Typography>

    //     <Button
    //       onClick={onDeleteHandler}
    //       style={{ fontWeight: "bold", color: "#c91c23", marginTop: "1rem" }}
    //     >
    //       Delete
    //       <DeleteIcon style={{ marginLeft: "1rem" }} />
    //     </Button>
    //     <br />
    //     <Link href={"/tasks"}>
    //       <Button style={{ marginTop: "1rem" }}>Go back</Button>
    //     </Link>
    //   </CardContent>
    // </Card>
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        marginTop: "5rem",
        boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: "14px",
      }}
    >
      <CardHeader
        // className={classes[props.priority]}
        sx={{ backgroundColor: "#161853" }}
        titleTypographyProps={{
          color: "white",
          fontWeight: "bold",
        }}
        title={props.title}
        subheader={`Due date - ${props.date}`}
        subheaderTypographyProps={{
          color: "white",
        }}
      />
      <CardContent>
        <Typography variant="body2">{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          sx={{ fontWeight: "bold" }}
          color="secondary"
          onClick={onDeleteHandler}
          size="small"
        >
          Delete
        </Button>
        <Link href={"/tasks"} passHref={true}>
          <Button
            sx={{ fontWeight: "bold" }}
            color="primary"
            variant="outlined"
            size="small"
          >
            Go back
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
