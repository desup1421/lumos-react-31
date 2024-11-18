import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`card bg-base-100 shadow-xl ${isDragging && "opacity-50"}`}
    >
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p>{task.description}.</p>
        <div className="badge badge-outline">{task.tag}</div>
        <div className="text-sm text-gray-500 mt-2">{task.startDate} - {task.endDate}</div>
      </div>
    </div>
  );
};

export default TaskCard;
