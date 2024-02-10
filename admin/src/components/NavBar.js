import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './../css/NavBar.css'; // Import custom CSS

export function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleCollapse}>
        {isCollapsed ? '☰' : '✖'}
      </button>
      {!isCollapsed && (
        <ul className="nav-items">
          <li>Drivers</li>
          <li>Assignments</li>
          <li>Opt-in Requests</li>
        </ul>
      )}
    </div>
  );
}