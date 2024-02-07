import React, { useState } from 'react';
import './../css/DriverForm.css';

export function DriverForm({ onAddDriver }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a driver object with the form values
    const driver = {
      name,
      address,
      privateKey,
    };
    // Call the onAddDriver function from the parent component and pass the driver object
    onAddDriver(driver);
    // Reset form values
    setName('');
    setAddress('');
    setPrivateKey('');
  };

  return (
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

      <label htmlFor="private-key">Private Key:</label>
      <input
        type="password"
        id="private-key"
        value={privateKey}
        onChange={(event) => setPrivateKey(event.target.value)}
        required
      />

      <button type="submit">Add Driver</button>
    </form>
  );
}