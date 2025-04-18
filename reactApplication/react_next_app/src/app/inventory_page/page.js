"use client";

import styles from "./inventory_page_stylesheet.css";
import Toolbar from "@/components/toolbar/top_toolbar";
import React, { useState, useEffect } from 'react';
import { get_inventory } from "@/controllers/inventory_controller";

export default function Inventory() {

const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    Id: '',
    Name: '',
    Type: '',
    Status: '',
    Created_Date: '',
    Assigned_User: '',
    Department: '',
    Last_Update: '',
  });
  const [role, setRole] = useState('admin');

    // Fetch inventory items based on role
    const fetchInventory = async () => {
        try {
            console.log(get_inventory())
        } catch (error) {
          //console.error('Error fetching inventory:', error);
        }
      };
    
      useEffect(() => {
        fetchInventory();
      }, [role]);
    
      // Handle input change
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      // Submit a new item
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          alert('Item added successfully!');
          setForm({ Id: '', Name: '', Type: '', Status: '', Created_Date: '', Assigned_User: '', Department: '', Last_Update: '' });
          fetchInventory();
        } catch (error) {
          console.error('Error creating item:', error);
        }
      };

  return (
    <div className="inventory-page-container">
      <div><Toolbar /></div>
      <div className="inventory-main-container">
      <h1>Inventory Management</h1>

      <div className="mb-4">
        <label>User Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="ml-2 p-1 border"
        >
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
          <option value="manager">Manager</option>
          <option value="technician">Technician</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="block w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Inventory Item
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Inventory Items</h2>
      <ul className="space-y-1">
        {inventory.map((item) => (
          <li key={item.Id} className="border p-2 rounded">
            <strong>{item.Name}</strong> ({item.Type}) - {item.Status}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}