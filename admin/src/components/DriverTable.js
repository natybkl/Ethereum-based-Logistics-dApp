import React, { useState } from 'react';
import './../css/DriverTable.css';
import { DriverForm } from './DriverForm';

export function DriverTable() {
  const [showForm, setShowForm] = useState(false);
  const [drivers, setDrivers] = useState([]); // Add a state for managing the list of drivers

  const handleAddDriver = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (driver) => {
    // Handle the form submission here, e.g., add the new driver to the table
    console.log('Submitted driver:', driver);

    // Add the new driver to the list of drivers
    setDrivers((prevDrivers) => [...prevDrivers, driver]);

    // Reset the form visibility
    setShowForm(false);
  };

  return (
    <div>
      <table className="driver-table">
        <thead>
          <tr className="header-row">
            <th>Name</th>
            <th>Address</th>
            <th>Total Asset</th>
            <th>On Duty Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.address}</td>
              <td>{driver.totalAsset}</td>
              <td>{driver.onDutyStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-driver-button" onClick={handleAddDriver}>
        Add Driver
      </button>
      {showForm && <DriverForm onAddDriver={handleFormSubmit} />}
    </div>
  );
}