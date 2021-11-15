import { useState } from "react";

const useValidation = (validateFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValueTouched, setIsValueTouched] = useState(false);
  let isValid = validateFn(enteredValue);
  let hasError = !isValid && isValueTouched;
  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const onBlurHandler = () => {
    setIsValueTouched(true);
  };

  const onToggle = () => {
    setIsValueTouched(false);
  };
  return {
    isValid,
    hasError,
    enteredValue,
    onChangeHandler,
    onBlurHandler,
    onToggle,
  };
};
export default useValidation;
