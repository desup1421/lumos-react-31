import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, title), // Pindahkan task ke kolom ini
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`flex-1 bg-slate-100 dark:bg-slate-700 p-4 rounded-lg ${isOver && "bg-slate-200"}`}
    >
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
