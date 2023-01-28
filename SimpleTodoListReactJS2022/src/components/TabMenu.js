import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TodoList from "./TodoList";
import "./TabMenu.css";

const TabMenu = () => {
  const [value, setValue] = useState("home");

  const handleChanged = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChanged}>
        <Tab value="home" label="Home" />
        <Tab value="todos" label="Todos" />
      </Tabs>
      {value === "home" && <h1 className="h1">Welcome to Todo App</h1>}{" "}
      {value === "todos" && (
        <div>
          <TodoList />
        </div>
      )}{" "}
    </div>
  );
};

export default TabMenu;
