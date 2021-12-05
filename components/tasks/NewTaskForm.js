import useValidation from "../../hooks/use-validation";
import { useRouter } from "next/router";
import Card from "../UI/Card";
import classes from "./NewTaskForm.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import * as React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NewTaskForm = () => {
  const { httpRequest } = useHttp();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [dateValue, setDateValue] = useState(null);
  Date.prototype.isValid = function () {
    console.log(new Date() < this);
    if (this.getTime() === this.getTime()) {
      return new Date() < this;
    }
  };
  const {
    isValid: isPriorityValid,
    enteredValue: enteredPriority,
    onBlurHandler: onPriorityBlurHandler,
    onChangeHandler: onPriorityChangeHandler,
  } = useValidation((value) => value);
  const { onBlurHandler: onDateBlurHandler } = useValidation((value) => value);

  const {
    hasError: hasTitleError,
    isValid: isTitleValid,
    enteredValue: enteredTitle,
    onBlurHandler: onTitleBlurHandler,
    onChangeHandler: onTitleChangeHandler,
  } = useValidation((value) => value.trim().length > 0);
  const {
    hasError: hasDescriptionError,
    enteredValue: enteredDescription,
    isValid: isDescriptionValid,
    onBlurHandler: onDescriptionBlurHandler,
    onChangeHandler: onDescriptionChangeHandler,
  } = useValidation((value) => value.trim().length > 0);
  let formIsValid = false;

  if (
    isTitleValid &&
    isDescriptionValid &&
    isPriorityValid &&
    dateValue &&
    dateValue.isValid()
  ) {
    formIsValid = true;
  }

  const titleClasses = hasTitleError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const descriptionClasses = hasDescriptionError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const startDate = new Date();
  function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log();

    if (formIsValid) {
      setIsLoading(true);
      fetch("/api/new-task", {
        method: "POST",
        body: JSON.stringify({
          currentUser: currentUser,
          title: enteredTitle,
          description: enteredDescription,
          priority: enteredPriority,
          date: dateValue.toISOString().slice(0, 10),
          checked: false,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log(res.json());
          }
        })
        .then((data) => {
          httpRequest(currentUser);
          router.push("/tasks");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Card>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <TextField
              className={titleClasses}
              id="outlined-basic"
              onChange={onTitleChangeHandler}
              onBlur={onTitleBlurHandler}
              label="Task Title"
              variant="outlined"
              value={enteredTitle}
              margin="normal"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              className={descriptionClasses}
              id="outlined-basic"
              onChange={onDescriptionChangeHandler}
              onBlur={onDescriptionBlurHandler}
              label="Task Description"
              variant="outlined"
              value={enteredDescription}
            />
          </FormControl>

          <FormControl
            sx={{ marginTop: "1rem", minWidth: 120, marginRight: "1rem" }}
          >
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              labelId="priority"
              id="select"
              value={enteredPriority}
              label="priority"
              onChange={onPriorityChangeHandler}
              onBlur={onPriorityBlurHandler}
            >
              <MenuItem value="1">High</MenuItem>
              <MenuItem value="2">Medium</MenuItem>
              <MenuItem value="3">Low</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due date"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              shouldDisableDate={disablePrevDates(startDate)}
              onBlur={onDateBlurHandler}
              renderInput={(params) => (
                <TextField
                  sx={{ marginTop: "1rem", minWidth: 120 }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        {!isLoading && (
          <div className={classes.actions}>
            <button disabled={!formIsValid}>Add Task</button>
          </div>
        )}
        {isLoading && <LoadingSpinner />}
      </Card>
    </form>
  );
};

export default NewTaskForm;
