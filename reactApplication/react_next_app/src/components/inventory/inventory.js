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

            <div className= "role-department-selectors">
                <div className="user_role_selector">
                    <label>User Role: </label>
                    <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="role_selector"
                    >
                    <option value="admin">Admin</option>
                    <option value="auditor">Auditor</option>
                    <option value="manager">Manager</option>
                    <option value="technician">Technician</option>
                    <option value="employee">Employee</option>
                    </select>
                </div>

                <div className="department_selector">
                    <label>Department: </label>
                    <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="department_selector"
                    >
                    <option value="admin">Admin</option>
                    <option value="auditor">Auditor</option>
                    <option value="manager">Manager</option>
                    <option value="technician">Technician</option>
                    <option value="employee">Employee</option>
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="add_item_form">
                {Object.keys(form).map((key) => (
                <input
                    key={key}
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    placeholder={key}
                    className="add_item_input"
                />
                ))}
                <button type="submit" className="add_item_button">
                Add Inventory Item
                </button>
            </form>

            <h2>Inventory Items</h2>
            <div className="inventory_table_wrapper">
                <table className="inventory_table">
                    <thead>
                        <tr>
                        {Object.keys(inventory[0] || {}).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item, index) => (
                        <tr key={index}>
                            {Object.keys(item).map((key) => (
                            <td key={key}>{item[key]}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}