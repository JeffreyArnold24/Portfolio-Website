import React, { useState, useEffect } from 'react';
import { get_inventory, submit_new_inventory_item, update_inventory_item } from "@/controllers/inventory_controller";
import styles from './inventory.css'

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
  });
  const [role, setRole] = useState('admin');
  const [department, setDepartment] = useState('IT');
  

    // Fetch inventory items based on role and department
    const fetchInventory = async (role, department) => {
        try {
            const items = await get_inventory(role, department)
            setInventory(items)
        } catch (error) {
          console.error('Error fetching inventory:', error);
        }
      };
    
      useEffect(() => {
        fetchInventory(role, department);
      }, [role, department]);
    
      // Handle input change
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      // Submit a new item
      const handleSubmit = async (e) => {
        try {
          
          setForm({ Id: '', Name: '', Type: '', Status: '', Created_Date: '', Assigned_User: '', Department: ''});
          submit_new_inventory_item(form)

        } catch (error) {
          console.error('Error creating item:', error);
        }
      };
      return (
        <div className = "inventory_main_container">
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

        <div className="mb-5">
            <label>Department:</label>
            <select
            value={role}
            onChange={(e) => setDepartment(e.target.value)}
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
        <ul className="space-y-4">
            {inventory.map((item) => (
            <li key={item.Id} className="border p-4 rounded bg-white shadow">
                <div className="space-y-1">
                {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="flex">
                    <span className="font-semibold mr-2">{key}:</span>
                    <span>{value}</span>
                    </div>
                ))}
                </div>
            </li>
            ))}
        </ul>
    </div>
    );

}