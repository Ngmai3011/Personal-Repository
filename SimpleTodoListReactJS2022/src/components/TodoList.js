import React, {useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";

import "./TodoList.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import TodoInput from "./TodoInput";
import {Button} from "@mui/material";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const handleTodoAdded = (todo) => {
    const newTodos = todos.concat(todo);

    setTodos(newTodos);
  };

  const handleDeleteClick = (rowIndex) => {
    const newTodos = todos.filter((_, index) => index !== rowIndex);
    setTodos(newTodos);
  };

  const columns = [
    {
      field: "description",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellRenderer: (param) => {
        if (param.data.date.$d)
          return param.data.date.$d.toLocaleDateString("en-US");
        return param.data.date.toLocaleDateString("en-US");
      },
    },
    {
      field: "priority",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? {color: "red"} : {color: "black"},
    },
    {
      field: "",
      cellRenderer: (data) => {
        return (
          <Button onClick={() => handleDeleteClick(data.rowIndex)}>
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <TodoInput onTodoAdded={handleTodoAdded} />
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "50%",
          margin: "auto",
        }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          animateRows="true"
          columnDefs={columns}
          rowData={todos}
        />
      </div>
    </div>
  );
}

export default TodoList;
