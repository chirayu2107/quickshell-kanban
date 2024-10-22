import React from "react";
import TicketCard from "./TicketCard";

// Define a mapping from priority levels to their names and icon paths
const priorityMapping = {
  4: { name: "Urgent", icon: require("./icons/SVG - Urgent Priority colour.png") },
  3: { name: "High", icon: require("./icons/urgent.png") },
  2: { name: "Medium", icon: require("./icons/Img - Medium Priority.png") },
  1: { name: "Low", icon: require("./icons/Img - Low Priority.png") },
  0: { name: "No priority", icon: require("./icons/No-priority.png") },
};

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  const groupedTickets = groupTickets(tickets, grouping, users);

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="kanban-column">
          <div className="kanban-column-header">
            <div className="group-info">
              {renderGroupHeader(group, grouping, groupedTickets)}
              <span className="count-for-the-task">
                <img className="icon-small" src={require("./icons/add.png")} alt="Add" />
                <img className="icon-small" src={require("./icons/3 dot menu.png")} alt="More" />
              </span>
            </div>
          </div>
          <div className="ticket-list">
            {/* Show ticket cards for all groups, including priority */}
            {groupedTickets[group]
              .sort((a, b) => sortTickets(a, b, ordering))
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const renderGroupHeader = (group, grouping, groupedTickets) => {
  const groupCount = groupedTickets[group]?.length || 0;

  return (
    <>
      {grouping === "priority" && (
        <>
          <img src={priorityMapping[group]?.icon} alt={priorityMapping[group]?.name} className="status-icon small-icon" />
          <span className="group-name">{priorityMapping[group]?.name}</span>
          <span className="group-count">{groupCount}</span>
        </>
      )}
      {grouping === "user" && renderUserHeader()}
      {grouping === "status" && renderStatusHeader(group)}
    </>
  );
};

const renderUserHeader = () => (
  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" className="user-icon small-icon" />
);

const renderStatusHeader = (group) => {
  const statusIcons = {
    "Todo": require("./icons/To-do.png"),
    "In progress": require("./icons/in-progress.png"),
    "Backlog": require("./icons/Backlog.png"),
  };

  return (
    <img
      src={statusIcons[group]}
      alt={group}
      className="status-icon small-icon"
    />
  );
};

const groupTickets = (tickets, grouping, users) => {
  return tickets.reduce((groups, ticket) => {
    const groupKey = grouping === "user" 
      ? users.find((user) => user.id === ticket.userId)?.name || "Unassigned"
      : ticket[grouping];

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
    return groups;
  }, {});
};

const sortTickets = (a, b, ordering) => {
  return ordering === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title);
};

export default KanbanBoard;
