// import { useContext, useState } from "react";
// import AddTask from "./components/AddTask";
// import ToDoScreen from "./screens/ToDoScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskProvider} from "./context/TaskContext";
import LoginScreen from "./screens/LoginScreen";
import ToDoScreen from "./screens/ToDoScreen";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen/>,
  },
  {
    path:"/to-do",
    element: <ToDoScreen/>,
  },
]);

const App = () => {
  return (
  <TaskProvider>
    <RouterProvider router={router} />
  </TaskProvider>
  );
};

export default App;