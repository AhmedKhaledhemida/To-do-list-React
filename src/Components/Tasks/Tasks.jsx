import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import axios from "axios";

export default function Tasks() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: { token: token },
        params: search ? { search } : {},
      });
      setData(response.data?.data || []);
    } catch (error) {
      console.error(error);
      setError("There are no tasks");
      setData([]); // ensure it's always an array
    }
  };

  useEffect(() => {
    getTasks();
  }, [refresh, search]);
  const triggerRefresh = () => setRefresh((prev) => !prev);

  if (!Array.isArray(data) || data.length === 0 || error) {
    return (
      <div className="container-fluid main-margin py-4">
        <div>
          <input
            type="search"
            placeholder="Search tasks..."
            className="form-control w-50 mx-auto shadow-sm rounded-pill px-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className=" d-flex justify-content-center align-items-center">
          <h2 className="main-margin text-center text-main">No tasks found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid main-margin py-4">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search tasks..."
          className="form-control w-50 mx-auto shadow-sm rounded-pill px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {data.map((item) => (
        <ul className="list-unstyled" key={item._id}>
          <Task item={item} onTaskChange={triggerRefresh} />
        </ul>
      ))}
    </div>
  );
}
