import { FC, FormEventHandler, useRef } from "react";
import classes from "./TaskForm.module.css";

type TaskFormProps = {
  onEnterTask: (text: string) => void;
  loading: boolean;
};

const TaskForm: FC<TaskFormProps> = ({ onEnterTask, loading }) => {
  /*#TA02*/
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = inputRef.current?.value;
    /* notify parent */
    if (value && value.trim().length > 0) onEnterTask(value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={inputRef} />
      <button>{loading ? "Sending" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
