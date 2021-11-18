import useValidation from "../../hooks/use-validation";
import { useRouter } from "next/router";
import Card from "../UI/Card";
import classes from "./NewTaskForm.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasks-slice";
import useHttp from "../../hooks/use-http";
const NewTaskForm = () => {
  const fetchTasks = useHttp();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const httpRequest = async () => {
    console.log("clicked");
    const res = await fetch("/api/tasks");
    const data = await res.json();
    const taskData = data.map((task) => {
      return {
        title: task.title,
        description: task.description,
        id: task._id.toString(),
        currUser: task.currentUser,
      };
    });
    const finalTaskData = taskData.filter(
      (task) => task.currUser === currentUser
    );
    console.log(finalTaskData);
    dispatch(tasksActions.setItems(finalTaskData));
  };

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

  if (isTitleValid && isDescriptionValid) {
    formIsValid = true;
  }

  const titleClasses = hasTitleError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const descriptionClasses = hasDescriptionError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      setIsLoading(true);
      fetch("/api/new-task", {
        method: "POST",
        body: JSON.stringify({
          currentUser: currentUser,
          title: enteredTitle,
          description: enteredDescription,
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
        .then((data) => fetchTasks(currentUser))
        .catch((error) => console.log(error.message));

      router.push("/tasks");
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Card>
        <div className={titleClasses}>
          <label htmlFor="title">Task Title</label>
          <input
            onChange={onTitleChangeHandler}
            onBlur={onTitleBlurHandler}
            type="text"
            required
            id="title"
            value={enteredTitle}
          />
        </div>
        <div className={descriptionClasses}>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={onDescriptionChangeHandler}
            onBlur={onDescriptionBlurHandler}
            id="description"
            required
            rows="5"
            value={enteredDescription}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Add Task</button>
        </div>
      </Card>
    </form>
  );
};

export default NewTaskForm;
