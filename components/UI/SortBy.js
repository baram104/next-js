import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { tasksActions } from "../../store/tasks-slice";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

export default function SortBy() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { httpRequest } = useHttp();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const onSort = (e) => {
    setAnchorEl(null);
    let sortBy;
    if (e.target.getAttribute("value") === "date") {
      sortBy = "date";
    }
    if (e.target.getAttribute("value") === "priority") {
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          margin: "auto",
          display: "block",
          marginTop: "2rem",
          fontWeight: "bold",
        }}
      >
        Sort By
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onSort} value="date">
          Date
        </MenuItem>
        <MenuItem onClick={onSort} value="priority">
          Priority
        </MenuItem>
      </Menu>
    </div>
  );
}
