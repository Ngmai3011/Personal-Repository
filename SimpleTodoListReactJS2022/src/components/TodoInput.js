import {Button, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";

const TodoInput = ({onTodoAdded}) => {
  const [todo, setTodo] = useState({
    description: "",
    date: new Date(),
    priority: "",
  });
  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const handleAddClick = () => {
    onTodoAdded(todo);
    setTodo({description: "", date: new Date(), priority: ""});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        padding={5}>
        <TextField
          variant="standard"
          onChange={inputChanged}
          label="Description"
          name="description"
          value={todo.description || ""}
        />
        <DatePicker
          onChange={(newDate) => {
            setTodo({date: newDate});
          }}
          label="Date"
          renderInput={(params) => <TextField {...params} />}
          value={todo.date || ""}
        />
        <TextField
          variant="standard"
          onChange={inputChanged}
          label="Priority"
          name="priority"
          value={todo.priority || ""}
        />
        <Button onClick={handleAddClick} variant="contained">
          Add
        </Button>
      </Stack>
    </LocalizationProvider>
  );
};

export default TodoInput;
