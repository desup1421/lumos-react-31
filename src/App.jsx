import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddTaskModal from "./components/AddTaskModal";
import KanbanColumn from "./components/KanbanColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("error:", err)
      })
  }, [])

  const [isShowModal, setIsShowModal] = useState(false);
  const handleToggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  // Fungsi untuk memindahkan task antar kolom
  const moveTask = (taskId, toColumn) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: toColumn } : task
      )
    );
  };

  return (
    <div>
      <Navbar handleToggleModal={handleToggleModal} />
      <AddTaskModal
        isShowModal={isShowModal}
        handleToggleModal={handleToggleModal}
      />
      <DndProvider backend={HTML5Backend}>
        <div className="p-4 flex space-x-4">
          <KanbanColumn
            title="Backlog"
            tasks={tasks.filter((task) => task.column === "Backlog")}
            moveTask={moveTask}
          />
          <KanbanColumn
            title="On Progress"
            tasks={tasks.filter((task) => task.column === "On Progress")}
            moveTask={moveTask}
          />
          <KanbanColumn
            title="Done"
            tasks={tasks.filter((task) => task.column === "Done")}
            moveTask={moveTask}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
