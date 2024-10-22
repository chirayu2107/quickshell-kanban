import React from "react";

const TicketCard = ({ ticket }) => {
  const truncatedTitle = ticket.title.length > 30 ? `${ticket.title.substring(0, 30)}...` : ticket.title;

  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User Avatar"
          className="user-avatar"
        />
      </div>
      <div className="ticket-title">{truncatedTitle}</div>
      <div className="card-footer">
        <div className="icon-box">
          <img
            src={require("./icons/3 dot menu.png")}
            alt="More Options"
            className="small-icon"
          />
        </div>
        <div className="ticket-tag">{ticket.tag?.[0] || "No Tag"}</div> {/* Display 'No Tag' if no tags exist */}
      </div>
    </div>
  );
};

export default TicketCard;
