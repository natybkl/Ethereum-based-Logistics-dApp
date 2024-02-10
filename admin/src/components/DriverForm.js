import React, { useState } from 'react';
import './../css/DriverForm.css';

export function DriverForm({ onCreateAccount }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the onCreateAccount function from the parent component and pass the input values
    onCreateAccount(name, address);

    // Reset form values
    setName('');
    setAddress('');
    setPrivateKey('');
  };

  return (
    <div>
      {!showForm && <button className="add-drivers-button" onClick={() => setShowForm(true)}>Create Account</button>}
      {showForm && (
        <form className="driver-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>
      )}
    </div>
  );
}
