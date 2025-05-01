import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Task({ item, onTaskChange }) {
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDesc, setEditDesc] = useState(item.description);
  const [date, setDate] = useState(item.duedate);
  const openModal = () => {
    setEditTitle(item.title);
    setEditDesc(item.description);
    setDate(item.duedate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    await axios.put(
      `http://localhost:3000/api/tasks/${item._id}`,
      { title: editTitle, description: editDesc, duedate: date },

      {
        headers: { token },
      }
    );
    setShowModal(false);
    onTaskChange();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/tasks/${item._id}`, {
      headers: { token },
    });
    onTaskChange();
  };

  const changeStatus = async () => {
    await axios.put(
      `http://localhost:3000/api/tasks/changestauts/${item._id}`,
      {},
      {
        headers: { token },
      }
    );
    onTaskChange();
  };

  return (
    <>
      <li
        className={`task-item shadow-sm p-3 mb-3 bg-white rounded d-flex justify-content-between align-items-center ${
          item.status === "Complete"
            ? "text-muted text-decoration-line-through"
            : ""
        }`}
      >
        <div>
          <h5 className="fw-bold mb-1">{item.title}</h5>
          <h6>{item.description}</h6>
          <small
            className={`badge ${
              item.status === "Completed" ? "bg-success" : "bg-danger"
            } text-light`}
          >
            {item.status}
          </small>
          <small className="badge bg-primary text-light ms-3">
            {item.duedate}
          </small>
        </div>
        <div className="btn-group">
          <button
            onClick={openModal}
            className="btn rounded ms-1 btn-outline-primary"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn rounded ms-1 btn-outline-danger"
          >
            Delete
          </button>
          <button
            onClick={changeStatus}
            className="btn rounded ms-1 btn-outline-success"
          >
            Complete
          </button>
        </div>
      </li>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
