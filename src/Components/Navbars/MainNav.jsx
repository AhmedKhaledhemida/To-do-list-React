import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MainNav() {
  let token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
    setDueDate("");
  };
  const handleAddTask = async () => {
    await axios.post(
      "http://localhost:3000/api/tasks",
      {
        title,
        description,
        duedate: dueDate,
      },
      {
        headers: { token },
      }
    );
    closeModal();
    window.location.reload();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid mx-3 py-2">
          <NavLink className="navbar-brand" to="/tasks">
            To Do List
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      to="/profile"
                    >
                      <i className="fa-solid fa-user me-1"></i> Profile
                    </NavLink>
                    <ul className="dropdown-menu p-2 font-sm bg-body-tertiary border-0 brdrshdow ">
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/users/updateuser">
                          Change User Details
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/signup"
                          onClick={() => localStorage.clear()}
                        >
                          SignOut{" "}
                          <i className="fa-solid fa-right-to-bracket"></i>
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link position-relative"
                      onClick={openModal}
                      style={{ cursor: "pointer" }}
                      to={"/tasks"}
                    >
                      <i className="fa-solid fa-plus"></i> Add Task
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      SignIn <i className="fa-solid fa-door-open"></i>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddTask}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
