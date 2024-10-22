import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./styles.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    () => localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    () => localStorage.getItem("ordering") || "priority"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load tickets and users from API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Load grouping and ordering from localStorage only on first render
    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }

    if (savedOrdering) {
      setOrdering(savedOrdering);
    }
  }, []);

  useEffect(() => {
    // Save grouping and ordering to localStorage whenever they change
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);

    // Debugging: Log to console to confirm saving
    console.log("Saved to localStorage:", {
      grouping,
      ordering,
    });
  }, [grouping, ordering]);

  const handleGroupingChange = (e) => {
    const selectedGrouping = e.target.value;
    setGrouping(selectedGrouping);
  };

  const handleOrderingChange = (e) => {
    const selectedOrdering = e.target.value;
    setOrdering(selectedOrdering);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="filter-section">
          <button
            className="display-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/free-filter-icon-download-in-svg-png-gif-file-formats--setting-user-application-interface-outline-pack-icons-1389150.png?f=webp&w=512"
              alt="Filter Icon"
              className="filter-icon"
            />
            Display
            <img
              src="https://img.icons8.com/?size=100&id=40021&format=png"
              alt="Filter Icon"
              className="filter-icon"
            />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-section">
                <span>Grouping</span>
                <select onChange={handleGroupingChange} value={grouping}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-section">
                <span>Ordering</span>
                <select onChange={handleOrderingChange} value={ordering}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
}

export default App;
