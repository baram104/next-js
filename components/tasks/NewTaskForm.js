import useValidation from "../../hooks/use-validation";
import { useRouter } from "next/router";
import Card from "../UI/Card";
import classes from "./NewTaskForm.module.css";
const NewTaskForm = () => {
  const router = useRouter();
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
    console.log(formIsValid, isDescriptionValid, isTitleValid);
    if (formIsValid) {
      console.log(enteredDescription, enteredTitle);
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
