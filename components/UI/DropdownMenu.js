import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const onLogoutHandler = () => {
    props.onLogout();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={props.className}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: "white" }} />
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
        <Link href="/tasks">
          <MenuItem value="myTasks" onClick={handleClose}>
            My Tasks
          </MenuItem>
        </Link>
        <Link href="/tasks/new-task">
          <MenuItem value="addTask" onClick={handleClose}>
            Add Task
          </MenuItem>
        </Link>
        <Link href="/">
          <MenuItem value="logout" onClick={onLogoutHandler}>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
