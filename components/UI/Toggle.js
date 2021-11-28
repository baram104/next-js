import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { tasksActions } from "../../store/tasks-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

export default function Toggle() {
  const { httpRequest } = useHttp();
  const [alignment, setAlignment] = React.useState("web");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const onSort = (e) => {
    let sortBy;
    if (e.target.value === "date") {
      sortBy = "date";
    }
    if (e.target.value === "priority") {
      sortBy = "priority";
    }
    dispatch(tasksActions.setIsLoading(true));
    fetch("/api/sort-tasks", {
      method: "POST",
      body: JSON.stringify({ currentUser, sortBy }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(tasksActions.setItems(data));
        httpRequest(currentUser);
      })
      .catch((err) => {
        console.error(err);
        dispatch(tasksActions.setIsLoading(false));
      });
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{
        color: "white",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <ToggleButton onClick={onSort} value="date">
        Date
      </ToggleButton>
      <ToggleButton onClick={onSort} value="priority">
        Priority
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
