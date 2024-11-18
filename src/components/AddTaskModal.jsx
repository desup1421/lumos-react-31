import React, {useState} from "react";
import axios from "axios";

const AddTaskModal = ({isShowModal, handleToggleModal}) => {
  const [formData, setFormData] = useState({
    column: 'Backlog',
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    tag: "Development"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/tasks", formData)
      .then(() => {
        alert("Success");
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          tag: "Development",
        });
      })
      .catch(() => {
        console.error("Error");
      })
      .finally(() => {
        handleToggleModal()
      });
  }

  return (
  <div className={`modal ${isShowModal && 'modal-open'}`}>
    <div className="modal-box">
      <h3 className="font-bold text-lg">Add Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Start Date</label>
          <input
            type="date"
            className="input input-bordered"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">End Date</label>
          <input
            type="date"
            className="input input-bordered"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Tag</label>
          <select
            className="select select-bordered"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          >
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="modal-action">
          <button type="button" onClick={handleToggleModal} className="btn">Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
)};

export default AddTaskModal;
